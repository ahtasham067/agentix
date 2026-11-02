import { contact } from "./site";
import type { Step } from "./types";

/** Shown after a submit when the quote was saved but the owner email failed. */
export const emailFailedNotice = `Your request is saved, but our email notification failed. For a faster reply, message us on WhatsApp at ${contact.phoneDisplay} or email ${contact.email}.`;
import { faq } from "./faq";

export const nextSteps: Step[] = [
  { title: "We review it", text: "We read your details and ask any questions." },
  { title: "You get a plan", text: "A scope, a timeline and a price." },
  { title: "We start", text: "Once you approve, we begin building." },
];

export const contactFaq = [
  { ...faq.howLong, answer: "It depends on the scope. Your quote includes a clear timeline." },
  faq.customWebApps,
  faq.howQuote,
];
