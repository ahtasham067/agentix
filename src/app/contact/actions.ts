"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { getAdminEnv } from "@/lib/env";
import { notifyNewQuote } from "@/lib/notify";
import { QUOTE_FIELDS, validateQuote, type FieldErrors, type QuoteField } from "@/lib/quote-schema";
import { clientIp, hashIp, isRateLimited } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";

export interface QuoteState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
  values?: Partial<Record<QuoteField, string>>;
  /** First name for the thank-you message. */
  name?: string;
}

const MAX_FIELD_LENGTH = 5000;

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const values = Object.fromEntries(
    QUOTE_FIELDS.map((field) => [
      field,
      String(formData.get(field) ?? "").slice(0, MAX_FIELD_LENGTH),
    ]),
  ) as Record<QuoteField, string>;

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const result = validateQuote(values);
  if (!result.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: result.errors,
      values,
    };
  }

  try {
    const env = getAdminEnv();
    const supabase = createAdminClient();
    const ipHash = hashIp(clientIp(await headers()), env.IP_HASH_SALT);

    if (await isRateLimited(supabase, ipHash, env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW_MINUTES)) {
      return {
        status: "error",
        message:
          "You have sent several requests in a short time. Please wait a few minutes and try again.",
        values,
      };
    }

    const quote = result.data;
    const { error } = await supabase.from("quotes").insert({
      full_name: quote.fullName,
      email: quote.email,
      whatsapp: quote.whatsapp || null,
      service: quote.service,
      budget: quote.budget,
      details: quote.details,
      ip_hash: ipHash,
    });
    if (error) throw new Error(error.message);

    after(() => notifyNewQuote(quote));
    return { status: "success", name: quote.fullName.split(/\s+/)[0] };
  } catch (error) {
    console.error("[quote] submission failed", error);
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again, or email us directly.",
      values,
    };
  }
}
