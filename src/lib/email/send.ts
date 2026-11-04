import "server-only";
import { contact } from "@/content/site";
import { getEmailEnv, missingEmailSettings, type EmailEnv } from "@/lib/env";
import type { QuoteInput } from "@/lib/quote-schema";
import { buildConfirmationEmail, buildOwnerEmail, type EmailMessage } from "./quote-email";
import { createSender } from "./sender";

const SECRET_KEYS = ["SMTP_PASS"] as const;

/** Sender and owner addresses. Throws, naming the missing variables, when email is not set up. */
export function emailAddresses(env: EmailEnv = getEmailEnv()): { from: string; owner: string } {
  const missing = missingEmailSettings(env);
  if (missing.length > 0) {
    throw new Error(`${env.EMAIL_PROVIDER} email is not configured: set ${missing.join(", ")}`);
  }
  return { from: env.EMAIL_FROM!, owner: env.EMAIL_TO ?? contact.email };
}

/** Sends one message with the provider chosen by EMAIL_PROVIDER. Throws when it fails. */
export async function sendEmail(
  message: EmailMessage,
  env: EmailEnv = getEmailEnv(),
): Promise<{ provider: EmailEnv["EMAIL_PROVIDER"]; id?: string }> {
  emailAddresses(env);
  const { id } = await createSender(env).send(message);
  return { provider: env.EMAIL_PROVIDER, id };
}

/** A one-line description of a send error, with any secret value removed. */
export function describeEmailError(error: unknown, env?: EmailEnv): string {
  let text = error instanceof Error ? error.message : String(error);
  const code = error instanceof Error ? (error as { code?: unknown }).code : undefined;
  if (typeof code === "string" && !text.includes(code)) text = `${code}: ${text}`;
  for (const key of SECRET_KEYS) {
    const secret = env?.[key];
    if (secret) text = text.replaceAll(secret, "[redacted]");
  }
  return text;
}

/** Emails the owner about a new quote. Returns false (never throws) when it fails. */
export async function sendOwnerNotification(quote: QuoteInput, id?: string): Promise<boolean> {
  let env: EmailEnv | undefined;
  try {
    env = getEmailEnv();
    const { from, owner } = emailAddresses(env);
    await sendEmail(buildOwnerEmail(quote, { from, to: owner, id }), env);
    return true;
  } catch (error) {
    console.error("[quote] owner notification failed:", describeEmailError(error, env));
    return false;
  }
}

/** Optional confirmation to the visitor (QUOTE_CONFIRMATION_ENABLED=true). Never throws. */
export async function sendVisitorConfirmation(quote: QuoteInput): Promise<void> {
  let env: EmailEnv | undefined;
  try {
    env = getEmailEnv();
    if (!env.QUOTE_CONFIRMATION_ENABLED) return;
    const { from } = emailAddresses(env);
    await sendEmail(buildConfirmationEmail(quote, { from }), env);
  } catch (error) {
    console.error("[quote] visitor confirmation failed:", describeEmailError(error, env));
  }
}
