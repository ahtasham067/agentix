import type { Step } from "@/content/types";
import { faq } from "./faq";

export const howWeWork: Step[] = [
  { title: "Discover", text: "We learn the task you want to automate and map where time is lost." },
  { title: "Design", text: "We plan the workflow or screens and agree the scope with you." },
  { title: "Build", text: "We build and test it with your real data and tools." },
  { title: "Launch", text: "We deploy it, check it works, and stay available for changes." },
];

export const homeFaq = [
  faq.whatIsAgent,
  faq.whichTools,
  faq.howLong,
  faq.customWebApps,
  faq.howQuote,
  faq.agentCost,
  faq.keepTools,
  faq.handOff,
];
