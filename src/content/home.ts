import type { Feature, Step } from "@/content/types";
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

export const homeUseCases = {
  heading: "Where AI agents and n8n automation help your business",
  intro:
    "AI agents and n8n automation for business work best on tasks that repeat every day. These are the four jobs we build most often, each connected to the tools you already use.",
  items: [
    {
      icon: "chat",
      title: "Customer support",
      text: "An agent answers common questions on WhatsApp or your website at any hour and hands complex cases to your team with the context included.",
    },
    {
      icon: "calendar",
      title: "Appointments",
      text: "Clients book, reschedule and cancel in chat. The agent checks real availability first, as CliniDesk does for clinics.",
    },
    {
      icon: "users",
      title: "Lead follow-up",
      text: "New leads get a reply in seconds. The agent asks qualifying questions, adds the lead to your CRM and alerts sales on Slack.",
    },
    {
      icon: "browser",
      title: "Internal tools",
      text: "n8n workflows move data between apps, send scheduled reports and feed the dashboards your team uses every day.",
    },
  ] satisfies Feature[],
};
