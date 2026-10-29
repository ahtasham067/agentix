import type { FaqItem } from "@/components/sections/FAQ";

/** Shared answers. Questions shown in the designs come first on each page. */
export const faq = {
  whatIsAgent: {
    question: "What is an AI agent?",
    answer:
      "An AI agent is software that understands a request, decides what to do and takes action in your tools, such as replying to a customer or booking an appointment.",
  },
  whichTools: {
    question: "Which tools can you connect?",
    answer:
      "WhatsApp, Gmail, Slack, Google Sheets, CRMs, databases and OpenAI, plus most tools that offer an API or webhooks. If your tool has an API, n8n can usually talk to it.",
  },
  howLong: {
    question: "How long does a project take?",
    answer: "It depends on the scope. Your quote includes a clear timeline.",
  },
  customWebApps: {
    question: "Do you build custom web apps too?",
    answer:
      "Yes. We build web apps and dashboards with Next.js, Ruby on Rails and Supabase, often around the agents and workflows we set up for you.",
  },
  howQuote: {
    question: "How do I get a quote?",
    answer:
      "Fill in the quote form with what you want to build or automate. We read it, ask any questions, and reply with a scope, a timeline and a price.",
  },
  agentCost: {
    question: "How much does an AI agent cost?",
    answer:
      "It depends on the scope: how many tasks the agent handles, which tools it connects to, how much AI usage it needs, and the hosting and support you want. Tell us the job and we will send a clear price.",
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
