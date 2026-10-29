import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "ai-agents", label: "AI Agents" },
  { value: "n8n-automation", label: "n8n Automation" },
  { value: "web-apps", label: "Web Apps" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-250k", label: "Under Rs 250k" },
  { value: "250k-1m", label: "Rs 250k – 1M" },
  { value: "1m-3m", label: "Rs 1M – 3M" },
  { value: "3m-plus", label: "Rs 3M+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [string, ...string[]];
const budgetValues = BUDGET_OPTIONS.map((o) => o.value) as [string, ...string[]];

/** Same rules as the `quotes` table checks, so the database never rejects valid input. */
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
const PHONE_RE = /^\+?[0-9][0-9 ()-]{6,19}$/;

export const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Please use a shorter email address.")
    .regex(EMAIL_RE, "Please enter a valid email address."),
  whatsapp: z
    .string()
    .trim()
    .max(20, "Please enter a valid phone number, for example +92 300 0000000.")
    .refine((v) => v === "" || PHONE_RE.test(v), {
      message: "Please enter a valid phone number, for example +92 300 0000000.",
    }),
  service: z.enum(serviceValues, { error: "Please choose a service." }),
  budget: z.enum(budgetValues, { error: "Please select a budget range." }),
  details: z
    .string()
    .trim()
    .min(20, "Please tell us a bit more (at least 20 characters).")
    .max(4000, "Please keep it under 4,000 characters."),
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
