import { contact, SITE_NAME } from "@/content/site";
import { BUDGET_OPTIONS, PLAN_OPTIONS, SERVICE_OPTIONS, type QuoteInput } from "@/lib/quote-schema";
import { escapeHtml, headerSafe } from "./escape";

export interface EmailMessage {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

const label = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

function rows(quote: QuoteInput): [string, string][] {
  return [
    ["Name", quote.fullName],
    ["Email", quote.email],
    ["WhatsApp", quote.whatsapp || "-"],
    ["Service", label(SERVICE_OPTIONS, quote.service)],
    ["Plan", label(PLAN_OPTIONS, quote.plan)],
    ["Budget", label(BUDGET_OPTIONS, quote.budget)],
  ];
}

/** The owner's notification. Reply-To is the visitor, so a reply goes straight to them. */
export function buildOwnerEmail(
  quote: QuoteInput,
  { from, to, id }: { from: string; to: string; id?: string },
): EmailMessage {
  const service = label(SERVICE_OPTIONS, quote.service);
  const plan = label(PLAN_OPTIONS, quote.plan);
  const subject = headerSafe(`New quote: ${service}, ${plan} – ${quote.fullName}`, 120);
  const fields = rows(quote);

  const text = [
    "New quote request from the website.",
    "",
    ...fields.map(([k, v]) => `${k}: ${v}`),
    ...(id ? [`Reference: ${id}`] : []),
    "",
    "Project details:",
    quote.details,
    "",
    "Reply to this email to answer the visitor.",
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1b1d21">
<h1 style="font-size:18px">New quote request</h1>
<table cellpadding="4" style="border-collapse:collapse">${fields
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding-right:12px">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`,
    )
    .join(
      "",
    )}${id ? `<tr><th align="left">Reference</th><td>${escapeHtml(id)}</td></tr>` : ""}</table>
<h2 style="font-size:16px">Project details</h2>
<p style="white-space:pre-wrap">${escapeHtml(quote.details).replaceAll("\n", "<br>")}</p>
<p style="color:#666">Reply to this email to answer the visitor.</p>
</body></html>`;

  return { from, to, replyTo: quote.email, subject, text, html };
}

/** Short confirmation for the visitor. Only their first name is echoed back. */
export function buildConfirmationEmail(
  quote: QuoteInput,
  { from }: { from: string },
): EmailMessage {
  const first = headerSafe(quote.fullName.split(/\s+/)[0] ?? "", 40);
  const lines = [
    `Hi ${first},`,
    "",
    `Thanks for your quote request. We will read your details and reply within one working day with questions or a plan, a timeline and a price.`,
    "",
    `If it is urgent, message us on WhatsApp at ${contact.phoneDisplay}.`,
    "",
    SITE_NAME,
  ];
  return {
    from,
    to: quote.email,
    replyTo: contact.email,
    subject: `We received your request – ${SITE_NAME}`,
    text: lines.join("\n"),
    html: `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1b1d21">${lines
      .map((l) => (l ? `<p>${escapeHtml(l)}</p>` : ""))
      .join("")}</body></html>`,
  };
}
