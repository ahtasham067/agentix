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
});

const notifySchema = z.object({
  RESEND_ENABLED: optional(z.enum(["true", "false"])).transform((v) => v === "true"),
  RESEND_API_KEY: optional(z.string().min(10)),
  QUOTE_NOTIFY_TO: optional(z.email()),
  QUOTE_NOTIFY_FROM: optional(z.string().min(3)),
});

export type PublicDbEnv = z.infer<typeof publicDbSchema>;
export type AdminEnv = z.infer<typeof adminSchema>;
export type NotifyEnv = z.infer<typeof notifySchema>;

/** Values needed to read public data. Throws with a clear message when missing. */
export function getPublicDbEnv(): PublicDbEnv {
  return parse(publicDbSchema, "Supabase public");
}

/** Values needed by the quote server action. */
export function getAdminEnv(): AdminEnv {
  return parse(adminSchema, "Supabase admin / quote form");
}

export function getNotifyEnv(): NotifyEnv {
  return parse(notifySchema, "Resend notification");
}

function parse<T extends z.ZodType>(schema: T, label: string): z.infer<T> {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    const fields = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Missing or invalid ${label} environment variables: ${fields}`);
  }
  return result.data;
}
