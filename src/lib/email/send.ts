import "server-only";
import nodemailer from "nodemailer";
import { contact } from "@/content/site";
import { emailConfigured, getEmailEnv } from "@/lib/env";
import type { QuoteInput } from "@/lib/quote-schema";
import { buildConfirmationEmail, buildOwnerEmail, type EmailMessage } from "./quote-email";

const SEND_TIMEOUT_MS = 10_000;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

let transport: ReturnType<typeof nodemailer.createTransport> | undefined;

function getTransport() {
  if (transport) return transport;
  const env = getEmailEnv();
  transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    // Remote servers must upgrade to TLS; the local mail catcher has no TLS.
    requireTLS: !env.SMTP_SECURE && !LOCAL_HOSTS.has(env.SMTP_HOST ?? ""),
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    connectionTimeout: SEND_TIMEOUT_MS,
    greetingTimeout: SEND_TIMEOUT_MS,
    socketTimeout: SEND_TIMEOUT_MS,
  });
  return transport;
}

async function send(message: EmailMessage): Promise<void> {
  const sending = getTransport().sendMail({
    ...message,
    // Message content never loads local files or remote URLs.
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("SMTP send timed out")), SEND_TIMEOUT_MS);
  });
  try {
    await Promise.race([sending, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/** Emails the owner about a new quote. Returns false (never throws) when it fails. */
export async function sendOwnerNotification(quote: QuoteInput, id?: string): Promise<boolean> {
  try {
    const env = getEmailEnv();
    if (!emailConfigured(env)) {
      console.error("[quote] email is not configured; owner notification skipped");
      return false;
    }
    await send(
      buildOwnerEmail(quote, {
        from: env.EMAIL_FROM!,
        to: env.QUOTE_NOTIFY_TO ?? contact.email,
        id,
      }),
    );
    return true;
  } catch (error) {
    console.error(
      "[quote] owner notification failed",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

/** Optional confirmation to the visitor (QUOTE_CONFIRMATION_ENABLED=true). Never throws. */
export async function sendVisitorConfirmation(quote: QuoteInput): Promise<void> {
  try {
    const env = getEmailEnv();
    if (!env.QUOTE_CONFIRMATION_ENABLED || !emailConfigured(env)) return;
    await send(buildConfirmationEmail(quote, { from: env.EMAIL_FROM! }));
  } catch (error) {
    console.error(
      "[quote] visitor confirmation failed",
      error instanceof Error ? error.message : error,
    );
  }
}

export function confirmationEnabled(): boolean {
  try {
    return getEmailEnv().QUOTE_CONFIRMATION_ENABLED;
  } catch {
    return false;
  }
}
