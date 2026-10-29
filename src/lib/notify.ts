import "server-only";
import { getNotifyEnv } from "@/lib/env";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, type QuoteInput } from "@/lib/quote-schema";

const label = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

/**
 * Sends a short email about a new quote through Resend's HTTP API.
 * Optional: does nothing unless RESEND_ENABLED=true. Never throws.
 */
export async function notifyNewQuote(quote: QuoteInput): Promise<void> {
  let env;
  try {
    env = getNotifyEnv();
  } catch (error) {
    console.error("[quote] notification config invalid", error);
    return;
  }
  if (!env.RESEND_ENABLED) return;
  if (!env.RESEND_API_KEY || !env.QUOTE_NOTIFY_TO || !env.QUOTE_NOTIFY_FROM) {
    console.error("[quote] RESEND_ENABLED is true but Resend settings are missing");
    return;
  }

  const text = [
    `Name: ${quote.fullName}`,
    `Email: ${quote.email}`,
    `WhatsApp: ${quote.whatsapp || "-"}`,
    `Service: ${label(SERVICE_OPTIONS, quote.service)}`,
    `Budget: ${label(BUDGET_OPTIONS, quote.budget)}`,
    "",
    quote.details,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.QUOTE_NOTIFY_FROM,
        to: [env.QUOTE_NOTIFY_TO],
        reply_to: quote.email,
        subject: `New quote request from ${quote.fullName}`,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[quote] Resend responded", res.status);
  } catch (error) {
    console.error("[quote] Resend request failed", error);
  }
}
