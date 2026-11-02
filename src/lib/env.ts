import "server-only";
import { z } from "zod";

/** Treats empty strings from .env files as "not set". */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional());

const publicDbSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_ANON_KEY: z.string().min(20),
});

const adminSchema = publicDbSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  IP_HASH_SALT: z.string().min(16),
  RATE_LIMIT_MAX: optional(z.coerce.number().int().positive()).default(3),
  RATE_LIMIT_WINDOW_MINUTES: optional(z.coerce.number().int().positive()).default(10),
  /** Header set by the hosting platform with the client IP (never a client-controlled one). */
  TRUSTED_IP_HEADER: optional(z.string().regex(/^[a-z0-9-]+$/i)).default("x-real-ip"),
});

const flag = optional(z.enum(["true", "false"])).transform((v) => v === "true");

const emailSchema = z.object({
  SMTP_HOST: optional(z.string().min(1)),
  SMTP_PORT: optional(z.coerce.number().int().positive()).default(587),
  /** true for implicit TLS (port 465); false uses STARTTLS when the server offers it. */
  SMTP_SECURE: flag,
  SMTP_USER: optional(z.string().min(1)),
  SMTP_PASS: optional(z.string().min(1)),
  /** Sender, for example: Agentix <quotes@agentix.website> */
  EMAIL_FROM: optional(z.string().min(3)),
  /** Owner inbox for new quotes. Defaults to the public contact email. */
  QUOTE_NOTIFY_TO: optional(z.email()),
  /** Also send the visitor a short confirmation email. */
  QUOTE_CONFIRMATION_ENABLED: flag,
});

export type PublicDbEnv = z.infer<typeof publicDbSchema>;
export type AdminEnv = z.infer<typeof adminSchema>;
export type EmailEnv = z.infer<typeof emailSchema>;

/** Values needed to read public data. Throws with a clear message when missing. */
export function getPublicDbEnv(): PublicDbEnv {
  return parse(publicDbSchema, "Supabase public");
}

/** Values needed by the quote server action. */
export function getAdminEnv(): AdminEnv {
  return parse(adminSchema, "Supabase admin / quote form");
}

export function getEmailEnv(): EmailEnv {
  return parse(emailSchema, "email (SMTP)");
}

/** True when SMTP is set up well enough to send mail. */
export function emailConfigured(env: EmailEnv = getEmailEnv()): boolean {
  return Boolean(env.SMTP_HOST && env.EMAIL_FROM && (!env.SMTP_USER || env.SMTP_PASS));
}

/**
 * Quote emails are mandatory in production: the server refuses to start
 * without SMTP settings (called from instrumentation.ts).
 */
export function assertEmailConfigured(nodeEnv = process.env.NODE_ENV): void {
  if (nodeEnv !== "production") return;
  if (!emailConfigured()) {
    throw new Error(
      "Quote emails are required in production: set SMTP_HOST, EMAIL_FROM and, if your server needs it, SMTP_USER and SMTP_PASS.",
    );
  }
}

function parse<T extends z.ZodType>(schema: T, label: string): z.infer<T> {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    const fields = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Missing or invalid ${label} environment variables: ${fields}`);
  }
  return result.data;
}
