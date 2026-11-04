import { faq } from "./faq";
import type { Step } from "./types";

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
