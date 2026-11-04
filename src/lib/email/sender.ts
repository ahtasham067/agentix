import "server-only";
import type { EmailEnv } from "@/lib/env";
import { createResendSender } from "./providers/resend";
import { createSmtpSender } from "./providers/smtp";
import type { EmailMessage } from "./quote-email";

/** One way to send email. Pick it with EMAIL_PROVIDER. */
export interface EmailSender {
  readonly provider: EmailEnv["EMAIL_PROVIDER"];
  /** Sends one message. Throws when the provider refuses it. */
  send(message: EmailMessage): Promise<{ id?: string }>;
}

export function createSender(env: EmailEnv): EmailSender {
  switch (env.EMAIL_PROVIDER) {
    case "resend":
      return createResendSender(env);
    case "smtp":
      return createSmtpSender(env);
  }
}
