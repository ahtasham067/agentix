import type { FaqItem } from "@/components/sections/FAQ";
import { formatPlanPrice, formatPrice, PRICING_DISCLAIMER, pricingGroups } from "./pricing";
import { TOOLS_SENTENCE } from "./tools";

const [websitePlans, chatbotPlans] = pricingGroups.map((g) => g.plans);

/** Shared answers. Questions shown in the designs come first on each page. */
export const faq = {
  whatIsAgent: {
    question: "What is an AI agent?",
    answer:
      "An AI agent is software that understands a request, decides what to do and takes action in your tools, such as replying to a customer or booking an appointment.",
  },
  whichTools: {
    question: "Which tools can you connect?",
    answer: `We work with ${TOOLS_SENTENCE}. We also connect Gmail, CRMs, databases and most other tools that offer an API or webhooks.`,
  },
  howLong: {
    question: "How long does a project take?",
    answer: "It depends on the scope. Your quote includes a clear timeline.",
  },
  customWebApps: {
    question: "Do you build custom web apps too?",
    answer:
      "Yes. We build websites, web apps and dashboards with React, Next.js, Vue.js, Ruby on Rails and Supabase, often around the agents and workflows we set up for you.",
  },
  howQuote: {
    question: "How do I get a quote?",
    answer:
      "Fill in the quote form with what you want to build or automate. We read it, ask any questions, and reply with a scope, a timeline and a price.",
  },
  agentCost: {
    question: "How much does an AI agent cost?",
    answer: `A chatbot starts at ${formatPrice(chatbotPlans[0].amount)} one-time or ${formatPlanPrice(chatbotPlans[1])}. An agent that takes more actions costs more, depending on how many tasks it handles, which tools it connects to and how much AI usage it needs. Tell us the job and we will confirm the price.`,
    extra: true,
  },
  websiteCost: {
    question: "How much does a custom website cost?",
    answer: `A custom website costs ${formatPrice(websitePlans[0].amount)} on the one-time plan, or ${formatPlanPrice(websitePlans[1])} on the subscription plan. ${PRICING_DISCLAIMER}`,
    extra: true,
  },
  chatbotCost: {
    question: "How much does a chatbot cost?",
    answer: `A chatbot costs ${formatPrice(chatbotPlans[0].amount)} on the one-time plan, or ${formatPlanPrice(chatbotPlans[1])} on the subscription plan. ${PRICING_DISCLAIMER}`,
    extra: true,
  },
  keepTools: {
    question: "Do I need to change the tools I already use?",
    answer:
      "No. We connect the agent and the workflows to the tools you already use, such as WhatsApp, Gmail, Slack, Google Sheets or your CRM.",
    extra: true,
  },
  handOff: {
    question: "Can an AI agent hand off to a human?",
    answer:
      "Yes. We set clear rules for when the agent should stop and pass the conversation to a person on your team, with the context included.",
    extra: true,
  },
} satisfies Record<string, FaqItem>;
