import "server-only";
import type { EmailEnv } from "@/lib/env";
import type { EmailSender } from "../sender";

export const RESEND_API_URL = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 10_000;

interface ResendResponse {
  id?: string;
  name?: string;
  message?: string;
}

/** Sends with the Resend HTTP API (one POST per message, no SDK). */
export function createResendSender(env: EmailEnv): EmailSender {
  return {
    provider: "resend",
    async send(message) {
      let res: Response;
      try {
        res = await fetch(RESEND_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: message.from,
            to: [message.to],
            reply_to: message.replyTo,
            subject: message.subject,
            text: message.text,
            html: message.html,
          }),
          signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
        });
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`Resend request failed: ${reason}`);
      }
      const body = (await res.json().catch(() => ({}))) as ResendResponse;
      if (!res.ok) {
        // For example: "Resend 403 validation_error: You can only send testing emails to ..."
        throw new Error(
          `Resend ${res.status} ${body.name ?? "error"}: ${body.message ?? res.statusText}`,
        );
      }
      return { id: body.id };
    },
  };
}
