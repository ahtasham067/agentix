import "server-only";
import nodemailer from "nodemailer";
import type { EmailEnv } from "@/lib/env";
import type { EmailSender } from "../sender";

const SEND_TIMEOUT_MS = 10_000;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/** Sends over SMTP: Gmail with an App Password, Mailpit in development, or any SMTP server. */
export function createSmtpSender(env: EmailEnv): EmailSender {
  const transport = nodemailer.createTransport({
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

  return {
    provider: "smtp",
    async send(message) {
      const sending = transport.sendMail({
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
        const info = await Promise.race([sending, timeout]);
        return { id: info.messageId };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
