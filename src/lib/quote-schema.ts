// zod/mini keeps the client bundle small; the same schema runs on the server.
import * as z from "zod/mini";

import { SERVICE_SLUGS } from "@/content/types";

/** Labels match the service names in src/content/services.ts (checked by a unit test). */
const SERVICE_LABELS: Record<(typeof SERVICE_SLUGS)[number], string> = {
  "chatbots-ai-agents": "Chatbots and AI Agents",
  automation: "Automation",
  "web-development": "Web Development",
  "seo-geo": "SEO and GEO",
};

export const SERVICE_OPTIONS = [
  ...SERVICE_SLUGS.map((value) => ({ value, label: SERVICE_LABELS[value] })),
  { value: "not-sure", label: "Not sure" },
] as const;

export const PLAN_OPTIONS = [
  { value: "one-time", label: "One-time plan" },
  { value: "subscription", label: "Subscription plan" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-250k", label: "Under Rs 250k" },
  { value: "250k-1m", label: "Rs 250k – 1M" },
  { value: "1m-3m", label: "Rs 1M – 3M" },
  { value: "3m-plus", label: "Rs 3M+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [string, ...string[]];
const planValues = PLAN_OPTIONS.map((o) => o.value) as [string, ...string[]];
const budgetValues = BUDGET_OPTIONS.map((o) => o.value) as [string, ...string[]];

/** Control characters (CR, LF, NUL and friends) are never valid in one-line fields. */
const CONTROL_RE = /[\u0000-\u001f\u007f]/;
/** Multi-line text may contain line breaks and tabs, but no other control characters. */
const CONTROL_EXCEPT_NEWLINES_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

/** Same rules as the `quotes` table checks, so the database never rejects valid input. */
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
const PHONE_RE = /^\+?[0-9][0-9 ()-]{6,19}$/;

export const quoteSchema = z.object({
  fullName: z.string().check(
    z.trim(),
    z.minLength(2, "Please enter your full name."),
    z.maxLength(100, "Please keep your name under 100 characters."),
    z.refine((v) => !CONTROL_RE.test(v), { message: "Please remove special characters." }),
  ),
  email: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Please enter your email address."),
      z.maxLength(254, "Please use a shorter email address."),
      z.regex(EMAIL_RE, "Please enter a valid email address."),
    ),
  whatsapp: z.string().check(
    z.trim(),
    z.maxLength(20, "Please enter a valid phone number, for example +92 3XX XXXXXXX."),
    z.refine((v) => v === "" || PHONE_RE.test(v), {
      message: "Please enter a valid phone number, for example +92 3XX XXXXXXX.",
    }),
  ),
  service: z.enum(serviceValues, { error: "Please choose a service." }),
  plan: z.enum(planValues, { error: "Please choose a plan." }),
  budget: z.enum(budgetValues, { error: "Please select a budget range." }),
  details: z.string().check(
    z.trim(),
    z.minLength(20, "Please tell us a bit more (at least 20 characters)."),
    z.maxLength(4000, "Please keep it under 4,000 characters."),
    z.refine((v) => !CONTROL_EXCEPT_NEWLINES_RE.test(v), {
      message: "Please remove special characters.",
    }),
  ),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
export const QUOTE_FIELDS = Object.keys(quoteSchema.shape) as QuoteField[];

export type FieldErrors = Partial<Record<QuoteField, string>>;

/** Validates raw form values and returns either data or one message per field. */
export function validateQuote(
  raw: Record<string, unknown>,
): { success: true; data: QuoteInput } | { success: false; errors: FieldErrors } {
  const result = quoteSchema.safeParse(raw);
  if (result.success) return { success: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as QuoteField;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}
