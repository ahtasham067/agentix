"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { contact } from "@/content/site";
import { sendOwnerNotification, sendVisitorConfirmation } from "@/lib/email/send";
import { getAdminEnv } from "@/lib/env";
import { QUOTE_FIELDS, validateQuote, type FieldErrors, type QuoteField } from "@/lib/quote-schema";
import { clientIp, hashIp } from "@/lib/rate-limit";
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

  const quote = result.data;
  let id: string;
  let supabase: ReturnType<typeof createAdminClient>;
  try {
    const env = getAdminEnv();
    supabase = createAdminClient();
    const ipHash = hashIp(clientIp(await headers(), env.TRUSTED_IP_HEADER), env.IP_HASH_SALT);

    // One database call checks the rate limit and inserts atomically (see submit_quote).
    const { data, error } = await supabase.rpc("submit_quote", {
      p_full_name: quote.fullName,
      p_email: quote.email,
      p_whatsapp: quote.whatsapp,
      p_service: quote.service,
      p_plan: quote.plan,
      p_budget: quote.budget,
      p_details: quote.details,
      p_ip_hash: ipHash,
      p_max: env.RATE_LIMIT_MAX,
      p_window_minutes: env.RATE_LIMIT_WINDOW_MINUTES,
    });
    if (error) throw new Error(error.message);
    if (!data) {
      return {
        status: "error",
        message:
          "You have sent several requests in a short time. Please wait a few minutes and try again.",
        values,
      };
    }
    id = data;
  } catch (error) {
    console.error("[quote] submission failed", error instanceof Error ? error.message : error);
    return {
      status: "error",
      message: `Something went wrong on our side. Please try again, or email us at ${contact.email}.`,
      values,
    };
  }

  const name = quote.fullName.split(/\s+/)[0];
  // The quote is saved. Now tell the owner. If that fails, the quote stays with
  // notified = false and the visitor still sees the normal thank-you message.
  const notified = await sendOwnerNotification(quote, id);
  if (notified) {
    const { error } = await supabase
      .from("quotes")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", id);
    if (error) console.error("[quote] could not record notified_at", error.message);
  } else {
    console.error(`[quote] ${id} saved, but the owner email was not sent (notified = false)`);
  }
  after(() => sendVisitorConfirmation(quote));

  return { status: "success", name };
}
