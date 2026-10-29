import type { FaqItem } from "@/components/sections/FAQ";
import type { Feature, IconName, ServiceSlug, Step } from "./types";
import { faq } from "./faq";
import { howWeWork } from "./home";

export type ServiceVisual = "support-chat" | "workflow" | "dashboard";

export interface Service {
  slug: ServiceSlug;
  name: string;
  icon: IconName;
  /** Line under the service name on /services (design copy). */
  summary: string;
  /** Four bullets on /services (design copy). */
  bullets: string[];
  hero: { title: string; intro: string; visual: ServiceVisual };
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: Feature[];
  outcomes: string[];
  productsTitle: string;
  connects: string[];
  faqTitle: string;
  faqs: FaqItem[];
  cta: { title: string; text: string };
  seo: { keyword: string; title: string; description: string };
  /** Descriptive anchor text used when other pages link here. */
  anchor: string;
  whoFor: { heading: string; paragraphs: string[] };
  useCases: { heading: string; intro: string; items: Feature[] };
  tools: { heading: string; paragraphs: string[] };
  process: { heading: string; steps: Step[] };
}

export const services: Service[] = [
  {
    slug: "ai-agents",
    name: "AI Agents",
    icon: "bot",
    summary: "Agents that talk to your customers and take action in your tools.",
    bullets: [
      "Customer support and FAQ agents",
      "Appointment booking on WhatsApp",
      "Lead follow-up and qualification",
      "Hand-off to a human when needed",
    ],
    hero: {
      title: "AI agents that work like a teammate.",
      intro: "They answer, book and follow up inside the tools you already use.",
      visual: "support-chat",
    },
    capabilitiesTitle: "What an agent can do",
    capabilitiesIntro: "Pick one job to start. Add more later.",
    capabilities: [
      {
        icon: "chat",
        title: "Answer customers",
        text: "Reply to common questions instantly, day and night.",
      },
      {
        icon: "calendar",
        title: "Book appointments",
        text: "Check availability and confirm slots in chat.",
      },
      {
        icon: "users",
        title: "Follow up with leads",
        text: "Qualify new leads and pass the good ones to your team.",
      },
      {
        icon: "search",
        title: "Research and summarize",
        text: "Find and organize information for your team.",
      },
    ],
    outcomes: [
      "The agent, connected to your tools",
      "A dashboard to review conversations",
      "Hand-off to a human when needed",
      "Monitoring and fixes after launch",
    ],
    productsTitle: "Agents we have built",
    connects: ["WhatsApp", "Gmail", "Slack", "Google Sheets", "CRMs", "Databases", "OpenAI", "n8n"],
    faqTitle: "About AI agents",
    faqs: [
      faq.whatIsAgent,
      faq.whichTools,
      faq.howLong,
      {
        question: "How much does an AI chatbot for WhatsApp cost?",
        answer:
          "It depends on the scope. The main factors are how many tasks the agent handles, which systems it connects to (a calendar, a CRM, a database), how many AI replies it sends, and the hosting and support you need. Meta also charges WhatsApp conversation fees, which depend on your country and volume. Tell us the job and we will send a clear price.",
        extra: true,
      },
      {
        question: "What is the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot answers questions. An AI agent also takes action: it can check a calendar, book a slot, update your CRM or notify your team. Many of our agents talk through a chat window, but the value comes from the actions behind it.",
        extra: true,
      },
      {
        question: "What happens when the agent cannot answer?",
        answer:
          "It hands the conversation to a person on your team, with the context included, so the customer does not have to repeat themselves. We agree these hand-off rules with you before launch.",
        extra: true,
      },
    ],
    cta: { title: "Ready for your first agent?", text: "Tell us the job you want it to do." },
    seo: {
      keyword: "custom AI agent development",
      title: "Custom AI Agent Development Services | Agentix",
      description:
        "Custom AI agent development for support, bookings and lead follow-up. Agents work in WhatsApp, Gmail, Slack and your CRM, with hand-off to your team.",
    },
    anchor: "custom AI agent development",
    whoFor: {
      heading: "Who custom AI agent development is for",
      paragraphs: [
        "Custom AI agents fit businesses that answer the same questions every day, book appointments by hand, or lose leads because nobody replies in time. Clinics, service businesses, online stores and sales teams are common examples.",
        "If a task follows clear rules and lives in a few tools, an agent can usually take it on. If it needs judgment that only your team has, the agent collects the details and passes the case to a person.",
      ],
    },
    useCases: {
      heading: "Common use cases for AI agents",
      intro: "Most agents start with one of these jobs.",
      items: [
        {
          icon: "chat",
          title: "Customer support",
          text: "Answer common questions on WhatsApp or your website and pass harder ones to your team.",
        },
        {
          icon: "calendar",
          title: "Appointment booking",
          text: "Check real availability, offer free slots and confirm the booking, as CliniDesk does for clinics.",
        },
        {
          icon: "users",
          title: "Lead follow-up",
          text: "Reply to new leads in seconds, ask qualifying questions and add them to your CRM.",
        },
        {
          icon: "search",
          title: "Research and summaries",
          text: "Collect information from documents and turn it into a short summary for your team.",
        },
      ],
    },
    tools: {
      heading: "How our agents work with your tools",
      paragraphs: [
        "Most of our agents run on n8n, which connects the language model to the tools you already use: the WhatsApp Business Cloud API, Gmail, Slack, Google Sheets, CRMs and databases.",
        "We use OpenAI models for most agents. When documents must stay private, we can run local models with Ollama and answer from your own files with retrieval (RAG). For document workflows we also use MCP to connect agents to services such as Google Drive.",
        "Every agent comes with a way to review conversations and clear rules for when to hand off to a human.",
      ],
    },
    process: { heading: "Our process for building an AI agent", steps: howWeWork },
  },
  {
    slug: "n8n-automation",
    name: "n8n Automation",
    icon: "workflow",
    summary: "Connect the apps you already use and remove repeated manual steps.",
    bullets: [
      "Workflows across WhatsApp, Gmail, Slack and Sheets",
      "Data sync between CRMs and databases",
      "Scheduled reports and alerts",
      "Monitoring so failures are caught early",
    ],
    hero: {
      title: "n8n automation services that remove manual work.",
      intro: "Connect the apps you already use and remove repeated manual steps.",
      visual: "workflow",
    },
    capabilitiesTitle: "What we automate",
    capabilitiesIntro: "Start with the steps your team repeats most.",
    capabilities: [
      {
        icon: "workflow",
        title: "Workflows across apps",
        text: "Move work between WhatsApp, Gmail, Slack and Sheets.",
      },
      {
        icon: "code",
        title: "Data sync",
        text: "Keep CRMs and databases in step without copy and paste.",
      },
      {
        icon: "chart",
        title: "Reports and alerts",
        text: "Send scheduled reports and alerts to the right people.",
      },
      {
        icon: "shield",
        title: "Monitoring",
        text: "Catch failed runs early, before anyone notices.",
      },
    ],
    outcomes: [
      "Workflows built and tested on your data",
      "Clear notes on what each workflow does",
      "Alerts when a run fails",
      "Fixes and changes after launch",
    ],
    productsTitle: "Workflows we have built",
    connects: [
      "WhatsApp",
      "Gmail",
      "Slack",
      "Google Sheets",
      "CRMs",
      "Databases",
      "OpenAI",
      "Webhooks",
    ],
    faqTitle: "About n8n automation",
    faqs: [
      {
        question: "What is n8n?",
        answer:
          "n8n is a workflow automation tool. It connects apps through their APIs and webhooks and runs steps in order, starting from a trigger such as a new message, a form entry or a schedule.",
      },
      faq.whichTools,
      {
        question: "Should I choose n8n, Zapier or Make?",
        answer:
          "It depends on your workflows. Zapier is the quickest for simple two-step automations. Make handles visual, branching flows. n8n suits teams that want more control, self-hosting, complex logic or AI steps. We help you compare them for your case.",
      },
      faq.howLong,
      {
        question: "What happens if a workflow fails?",
        answer:
          "We set up monitoring so a failed run sends an alert. Then we find the cause, fix it and re-run the work that was missed.",
      },
    ],
    cta: {
      title: "Have a workflow you want to automate?",
      text: "Tell us the steps you repeat. We reply with a plan and a timeline.",
    },
    seo: {
      keyword: "n8n automation services",
      title: "n8n Automation Services & Workflow Automation | Agentix",
      description:
        "n8n automation services from a small n8n automation agency: workflows across WhatsApp, Gmail, Slack and Sheets, data sync, reports and monitoring.",
    },
    anchor: "n8n automation services",
    whoFor: {
      heading: "Who n8n automation services are for",
      paragraphs: [
        "Teams that copy data between apps, send the same report every week, or check inboxes for messages that need a reply. If people on your team do the same steps in the same order, that work can usually be automated.",
        "Workflow automation is a good fit when you use several tools that do not talk to each other, such as WhatsApp, Gmail, Slack, Google Sheets and a CRM.",
      ],
    },
    useCases: {
      heading: "Workflow automation use cases",
      intro: "These are the workflows we are asked for most.",
      items: [
        {
          icon: "users",
          title: "Lead routing",
          text: "Send new leads from forms or WhatsApp to your CRM and notify sales on Slack.",
        },
        {
          icon: "code",
          title: "Data sync",
          text: "Keep CRMs, sheets and databases in sync without copy and paste.",
        },
        {
          icon: "chart",
          title: "Scheduled reports",
          text: "Build weekly reports from your data and send them by email or Slack.",
        },
        {
          icon: "shield",
          title: "Alerts and monitoring",
          text: "Get notified when something fails, so problems are caught early.",
        },
      ],
    },
    tools: {
      heading: "How n8n works with your tools",
      paragraphs: [
        "n8n connects apps through their APIs and webhooks. Each workflow starts with a trigger, such as a new message, a form entry or a schedule, and then runs its steps in order.",
        "We can add an AI step to any workflow, for example to sort a message or draft a reply with OpenAI. Workflows can run on n8n Cloud or on your own server, and we set up monitoring so you know when a run fails.",
      ],
    },
    process: { heading: "Our n8n automation process", steps: howWeWork },
  },
  {
    slug: "web-apps",
    name: "Web Apps",
    icon: "browser",
    summary: "Fast, secure web apps and dashboards built for your workflow.",
    bullets: [
      "Next.js and Ruby on Rails apps",
      "Supabase backend and authentication",
      "Admin dashboards and internal tools",
      "Payments and third-party integrations",
    ],
    hero: {
      title: "Next.js web app development for your workflow.",
      intro: "Fast, secure web apps and dashboards built for your workflow.",
      visual: "dashboard",
    },
    capabilitiesTitle: "What we build",
    capabilitiesIntro: "From a single dashboard to a full product.",
    capabilities: [
      {
        icon: "browser",
        title: "Next.js and Rails apps",
        text: "Fast, server-rendered apps on a stack that lasts.",
      },
      {
        icon: "shield",
        title: "Supabase back ends",
        text: "Postgres, authentication and row level security.",
      },
      {
        icon: "chart",
        title: "Dashboards and tools",
        text: "Admin dashboards and internal tools for your team.",
      },
      {
        icon: "card",
        title: "Payments and integrations",
        text: "Payments and third-party services, wired in safely.",
      },
    ],
    outcomes: [
      "A web app built and deployed for you",
      "Secure authentication and data access",
      "An admin view for your team",
      "Support and changes after launch",
    ],
    productsTitle: "Web apps we have built",
    connects: [
      "Next.js",
      "React",
      "Vue.js",
      "Ruby on Rails",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Vercel",
    ],
    faqTitle: "About web app development",
    faqs: [
      {
        question: "Why do you build with Next.js and Supabase?",
        answer:
          "Next.js gives fast, server-rendered pages that search engines can read. Supabase gives a Postgres database, authentication and row level security without running your own servers. Together they let us ship quickly and keep the app secure.",
      },
      {
        question: "Do you also work with Ruby on Rails?",
        answer:
          "Yes. We have built many Ruby on Rails apps and APIs with PostgreSQL, Sidekiq and Redis, often with React or Vue.js on the front end.",
      },
      {
        question: "Can you add payments to my app?",
        answer:
          "Yes. We have integrated Stripe, PayPal, Apple Pay, Afterpay and Klarna, along with analytics and Google APIs.",
      },
      {
        question: "How long does a web app take to build?",
        answer: "It depends on the scope. Your quote includes a clear timeline.",
      },
      faq.customWebApps,
    ],
    cta: {
      title: "Need a web app built?",
      text: "Tell us what it should do. We reply with a plan and a timeline.",
    },
    seo: {
      keyword: "Next.js web app development",
      title: "Next.js Web App Development with Supabase | Agentix",
      description:
        "Next.js web app development with Supabase and Ruby on Rails: dashboards, internal tools, customer portals and stores with payments, built to stay secure.",
    },
    anchor: "Next.js web app development",
    whoFor: {
      heading: "Who our web app development is for",
      paragraphs: [
        "Businesses that have outgrown spreadsheets, need a customer portal or an internal tool, or want a dashboard around their AI agents and workflows.",
        "We have built web apps for fintech, e-commerce, education and healthcare, from school management to a WhatsApp booking dashboard for clinics.",
      ],
    },
    useCases: {
      heading: "What we build with Next.js, Supabase and Rails",
      intro: "Typical projects look like one of these.",
      items: [
        {
          icon: "chart",
          title: "Admin dashboards",
          text: "Manage orders, bookings or records in one place.",
        },
        {
          icon: "users",
          title: "Customer portals",
          text: "Give customers a secure place to see their data.",
        },
        {
          icon: "card",
          title: "Online stores",
          text: "Stores with payments such as Stripe, PayPal or Klarna.",
        },
        {
          icon: "browser",
          title: "Internal tools",
          text: "Replace shared spreadsheets with a proper app.",
        },
      ],
    },
    tools: {
      heading: "Our web app stack: Next.js, Supabase and Ruby on Rails",
      paragraphs: [
        "We build most new web apps with Next.js and Supabase: Next.js for fast, server-rendered pages and Supabase for the Postgres database, authentication and row level security.",
        "For larger back ends we also use Ruby on Rails with PostgreSQL, Sidekiq and Redis for background jobs. Front ends can be React, Next.js or Vue.js. We deploy to Vercel or AWS and set up GitHub Actions for releases.",
        "Security is part of the build, not an extra. Data access is checked on the server, secrets never reach the browser, and forms are validated on both sides, so the app stays safe as it grows.",
      ],
    },
    process: { heading: "How we build your web app", steps: howWeWork },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceLinks = Object.fromEntries(
  services.map((s) => [s.slug, { href: `/services/${s.slug}`, name: s.name, anchor: s.anchor }]),
) as Record<ServiceSlug, { href: string; name: string; anchor: string }>;
