import type { FaqItem } from "@/components/sections/FAQ";
import type { Feature, IconName, ServiceSlug, Step } from "./types";
import { faq } from "./faq";
import { howWeWork } from "./home";
import { formatPlanPrice, formatPrice, getPricingGroup } from "./pricing";

export type ServiceVisual = "support-chat" | "workflow" | "dashboard" | "search";

export interface ComparisonTable {
  heading: string;
  intro?: string;
  /** First column is the row label. */
  columns: string[];
  rows: string[][];
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  icon: IconName;
  /** Line under the service name on /services (design copy for the first three). */
  summary: string;
  /** Four bullets on /services. */
  bullets: string[];
  hero: { title: string; intro: string; visual: ServiceVisual };
  /** Illustration beside "What you get". Defaults to the hero visual. */
  outcomeVisual?: "hero-workflow";
  /** 40 to 60 word direct answer that opens the page (GEO). */
  answer: string;
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: Feature[];
  outcomes: string[];
  productsTitle: string;
  /** Tools list ("Connects with" chips). */
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
  comparison: ComparisonTable;
  process: { heading: string; steps: Step[] };
  /** Date the page content last changed (visible "Last updated" and sitemap). */
  updated: string;
}

const UPDATED = "2026-11-02";

function priceFrom(slug: ServiceSlug) {
  const group = getPricingGroup(slug)!;
  const [oneTime, subscription] = group.plans;
  return { oneTime: formatPrice(oneTime.amount), subscription: formatPlanPrice(subscription) };
}

const website = priceFrom("web-development");
const chatbot = priceFrom("chatbots-ai-agents");

export const services: Service[] = [
  {
    slug: "chatbots-ai-agents",
    name: "Chatbots and AI Agents",
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
    outcomeVisual: "hero-workflow",
    answer: `Agentix builds AI chatbots and AI agents for businesses. A chatbot answers customer questions on WhatsApp or your website. An AI agent also takes action, such as booking appointments, qualifying leads or updating your CRM. We connect both to the tools you already use, and a chatbot starts at ${chatbot.oneTime} one-time or ${chatbot.subscription}.`,
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
      faq.chatbotCost,
      {
        question: "How much does an AI chatbot for WhatsApp cost?",
        answer: `Our chatbot plans are ${chatbot.oneTime} one-time or ${chatbot.subscription}. The final scope depends on how many tasks the chatbot handles, which systems it connects to and how many AI replies it sends. Meta also charges WhatsApp conversation fees, which depend on your country and volume.`,
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
      keyword: "AI chatbot and AI agent development",
      title: "AI Chatbot & AI Agent Development Services | Agentix",
      description:
        "AI chatbot and AI agent development for support, bookings and lead follow-up on WhatsApp and your website, with hand-off to your team when needed.",
    },
    anchor: "AI chatbot and AI agent development",
    whoFor: {
      heading: "Who needs AI chatbot and AI agent development?",
      paragraphs: [
        "Businesses that answer the same questions every day, book appointments by hand, or lose leads because nobody replies in time. Clinics, service businesses, online stores and sales teams are common examples.",
        "If a task follows clear rules and lives in a few tools, an agent can usually take it on. If it needs judgment that only your team has, the agent collects the details and passes the case to a person.",
      ],
    },
    useCases: {
      heading: "What can an AI chatbot or agent do for your business?",
      intro: "Most chatbots and agents start with one of these jobs.",
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
      heading: "Which tools do our chatbots and agents connect to?",
      paragraphs: [
        "Most of our agents run on n8n, which connects the language model to the tools you already use: the WhatsApp Business Cloud API, Gmail, Slack, Google Sheets, CRMs and databases.",
        "We use OpenAI models for most agents. When documents must stay private, we can run local models with Ollama and answer from your own files with retrieval (RAG). For document workflows we also use MCP to connect agents to services such as Google Drive.",
        "Every agent comes with a way to review conversations and clear rules for when to hand off to a human.",
      ],
    },
    comparison: {
      heading: "What is the difference between a chatbot and an AI agent?",
      intro: "Both talk to your customers. The difference is what happens after the reply.",
      columns: ["", "Chatbot", "AI agent"],
      rows: [
        ["Main job", "Answers questions", "Answers and takes action in your tools"],
        [
          "Example",
          "Replies to questions about prices or opening hours",
          "Checks the calendar and books the appointment",
        ],
        ["Connects to", "Your FAQ and documents", "Calendars, CRMs, databases, WhatsApp and Gmail"],
        [
          "Good first step when",
          "You get the same questions every day",
          "A task follows clear rules across several tools",
        ],
      ],
    },
    process: { heading: "How do we build a chatbot or AI agent?", steps: howWeWork },
    updated: UPDATED,
  },
  {
    slug: "automation",
    name: "Automation",
    icon: "workflow",
    summary: "Connect the apps you already use and remove repeated manual steps.",
    bullets: [
      "n8n, Make.com, Zapier and Airtable",
      "Data sync between CRMs and databases",
      "Scheduled reports and alerts",
      "Monitoring so failures are caught early",
    ],
    hero: {
      title: "Automation services with n8n, Make.com and Zapier.",
      intro: "Connect the apps you already use and remove repeated manual steps.",
      visual: "workflow",
    },
    answer:
      "Agentix builds workflow automations that connect the apps your team already uses, so repeated manual steps run on their own. n8n is our lead tool, and we also build in Make.com, Zapier and Airtable when they fit better. Typical workflows route leads, sync data between CRMs and sheets, send scheduled reports and alert you when a run fails.",
    capabilitiesTitle: "What we automate",
    capabilitiesIntro: "Start with the steps your team repeats most.",
    capabilities: [
      {
        icon: "workflow",
        title: "Workflows across apps",
        text: "Move work between WhatsApp, Gmail, Slack, Sheets and Airtable.",
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
      "n8n",
      "Make.com",
      "Zapier",
      "Airtable",
      "WhatsApp",
      "Gmail",
      "Slack",
      "Google Sheets",
      "CRMs",
      "Webhooks",
      "OpenAI",
    ],
    faqTitle: "About automation",
    faqs: [
      {
        question: "What is n8n?",
        answer:
          "n8n is a workflow automation tool. It connects apps through their APIs and webhooks and runs steps in order, starting from a trigger such as a new message, a form entry or a schedule.",
      },
      {
        question: "Should I choose n8n, Make.com or Zapier?",
        answer:
          "It depends on your workflows. Zapier is the quickest for simple two-step automations. Make.com handles visual, branching flows. n8n suits teams that want more control, self-hosting, complex logic or AI steps. We help you compare them for your case.",
      },
      {
        question: "Why is n8n your lead automation tool?",
        answer:
          "n8n can run on n8n Cloud or on your own server, handles branching logic and AI steps well, and lets us add code when a step needs it. We still use Make.com or Zapier when your team already works in them.",
      },
      {
        question: "Can you automate Airtable?",
        answer:
          "Yes. Airtable works well as a shared database your team can edit. We connect it to your other tools with n8n, Make.com or Zapier, and use Airtable's own automations for steps inside a base.",
      },
      faq.whichTools,
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
      title: "n8n Automation Services with Make & Zapier | Agentix",
      description:
        "n8n automation services, plus Make.com, Zapier and Airtable: workflows across WhatsApp, Gmail, Slack and Sheets, data sync, reports and monitoring.",
    },
    anchor: "n8n automation services",
    whoFor: {
      heading: "Who needs n8n automation services?",
      paragraphs: [
        "Teams that copy data between apps, send the same report every week, or check inboxes for messages that need a reply. If people on your team do the same steps in the same order, that work can usually be automated.",
        "Workflow automation is a good fit when you use several tools that do not talk to each other, such as WhatsApp, Gmail, Slack, Google Sheets, Airtable and a CRM.",
      ],
    },
    useCases: {
      heading: "What can you automate with n8n, Make.com or Zapier?",
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
          text: "Keep CRMs, sheets, Airtable bases and databases in sync without copy and paste.",
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
      heading: "How does n8n work with your tools?",
      paragraphs: [
        "n8n connects apps through their APIs and webhooks. Each workflow starts with a trigger, such as a new message, a form entry or a schedule, and then runs its steps in order.",
        "We can add an AI step to any workflow, for example to sort a message or draft a reply with OpenAI. Workflows can run on n8n Cloud or on your own server, and we set up monitoring so you know when a run fails.",
        "When your team already works in Make.com, Zapier or Airtable, we build there instead, so you keep the tools you know.",
      ],
    },
    comparison: {
      heading: "n8n vs Make.com vs Zapier vs Airtable: which should you use?",
      intro: "Each tool fits a different kind of work. We pick the one that suits your team.",
      columns: ["", "n8n", "Make.com", "Zapier", "Airtable"],
      rows: [
        [
          "Best for",
          "Complex logic, AI steps and self-hosting",
          "Visual, branching scenarios",
          "Quick, simple app-to-app automations",
          "A shared database with built-in automations",
        ],
        [
          "How you build",
          "Nodes on a canvas, with code when needed",
          "Modules on a visual canvas",
          "Step-by-step Zaps",
          "Tables, views and automations in a base",
        ],
        ["Hosting", "n8n Cloud or your own server", "Cloud", "Cloud", "Cloud"],
        [
          "How we use it",
          "Our lead tool for most projects",
          "When your team already uses it",
          "For short, simple automations",
          "As a light database your team can edit",
        ],
      ],
    },
    process: { heading: "How do we build your automation?", steps: howWeWork },
    updated: UPDATED,
  },
  {
    slug: "web-development",
    name: "Web Development",
    icon: "browser",
    summary: "Fast, secure web apps and dashboards built for your workflow.",
    bullets: [
      "React, Next.js, Vue.js and Rails apps",
      "Supabase backend and authentication",
      "Admin dashboards and internal tools",
      "Payments and third-party integrations",
    ],
    hero: {
      title: "Custom web development with Next.js, React and Rails.",
      intro: "Fast, secure websites, web apps and dashboards built for your workflow.",
      visual: "dashboard",
    },
    answer: `Agentix builds custom websites and web apps with React, Next.js, Vue.js and Ruby on Rails, using Supabase for the database and login where it fits. Projects range from business websites to dashboards, customer portals and online stores with payments. A custom website starts at ${website.oneTime} one-time or ${website.subscription}.`,
    capabilitiesTitle: "What we build",
    capabilitiesIntro: "From a single website to a full product.",
    capabilities: [
      {
        icon: "browser",
        title: "Custom websites",
        text: "Fast, search-friendly websites built around your business.",
      },
      {
        icon: "code",
        title: "React, Next.js, Vue.js and Rails",
        text: "Web apps on a stack that lasts, matched to your team.",
      },
      {
        icon: "shield",
        title: "Supabase back ends",
        text: "Postgres, authentication and row level security.",
      },
      {
        icon: "card",
        title: "Payments and integrations",
        text: "Payments and third-party services, wired in safely.",
      },
    ],
    outcomes: [
      "A website or web app built and deployed for you",
      "Secure authentication and data access",
      "An admin view for your team",
      "Support and changes after launch",
    ],
    productsTitle: "Web apps we have built",
    connects: [
      "React",
      "Next.js",
      "Vue.js",
      "Ruby on Rails",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Vercel",
    ],
    faqTitle: "About web development",
    faqs: [
      faq.websiteCost,
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
        question: "Do you build with Vue.js or only React?",
        answer:
          "Both. We build front ends in React, Next.js or Vue.js and pick the one that fits your team and any code you already have.",
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
    ],
    cta: {
      title: "Need a website or web app built?",
      text: "Tell us what it should do. We reply with a plan and a timeline.",
    },
    seo: {
      keyword: "custom web development",
      title: "Custom Web Development: Next.js, React & Rails | Agentix",
      description:
        "Custom web development with React, Next.js, Vue.js and Ruby on Rails on a Supabase backend: websites, dashboards, portals and stores with payments.",
    },
    anchor: "custom web development",
    whoFor: {
      heading: "Who needs custom web development?",
      paragraphs: [
        "Businesses that need a website of their own, have outgrown spreadsheets, need a customer portal or an internal tool, or want a dashboard around their AI agents and workflows.",
        "We have built web apps for fintech, e-commerce, education and healthcare, from school management to a WhatsApp booking dashboard for clinics.",
      ],
    },
    useCases: {
      heading: "What can we build with React, Next.js, Vue.js and Rails?",
      intro: "Typical projects look like one of these.",
      items: [
        {
          icon: "browser",
          title: "Business websites",
          text: "A fast, custom website that explains what you do and brings in enquiries.",
        },
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
      ],
    },
    tools: {
      heading: "Which stack do we use for web development?",
      paragraphs: [
        "We build most new websites and web apps with Next.js and Supabase: Next.js for fast, server-rendered pages and Supabase for the Postgres database, authentication and row level security.",
        "For larger back ends we also use Ruby on Rails with PostgreSQL, Sidekiq and Redis for background jobs. Front ends can be React, Next.js or Vue.js. We deploy to Vercel or AWS and set up GitHub Actions for releases.",
        "Security is part of the build, not an extra. Data access is checked on the server, secrets never reach the browser, and forms are validated on both sides, so the app stays safe as it grows.",
      ],
    },
    comparison: {
      heading: "React vs Next.js vs Vue.js vs Ruby on Rails",
      intro: "They solve different parts of a project, and many apps use two of them together.",
      columns: ["", "React", "Next.js", "Vue.js", "Ruby on Rails"],
      rows: [
        [
          "What it is",
          "A JavaScript library for interfaces",
          "A React framework with server rendering",
          "A JavaScript framework for interfaces",
          "A full-stack Ruby framework",
        ],
        [
          "Best for",
          "Interactive front ends",
          "Fast, search-friendly sites and apps",
          "Light front ends and existing Vue code",
          "Large back ends, APIs and background jobs",
        ],
        [
          "Pairs well with",
          "Next.js or a Rails API",
          "Supabase or a Rails API",
          "Rails or any API",
          "React or Vue.js, PostgreSQL and Sidekiq",
        ],
      ],
    },
    process: { heading: "How do we build your website or web app?", steps: howWeWork },
    updated: UPDATED,
  },
  {
    slug: "seo-geo",
    name: "SEO and GEO",
    icon: "search",
    summary: "Get found on Google and cited by AI answer engines.",
    bullets: [
      "Technical SEO and Core Web Vitals",
      "Keyword research and on-page SEO",
      "Structured data and llms.txt",
      "Visibility in ChatGPT, Perplexity and Gemini",
    ],
    hero: {
      title: "SEO and GEO so search engines and AI can find you.",
      intro: "Get found on Google and cited by ChatGPT, Perplexity and Gemini.",
      visual: "search",
    },
    answer:
      "SEO helps your pages rank on Google and Bing. GEO (generative engine optimization) helps AI answer engines such as ChatGPT, Perplexity, Gemini and Google AI Overviews find, understand and cite your site. Agentix covers both: technical SEO, keyword research, structured data, llms.txt, AI crawler access and answer-first content.",
    capabilitiesTitle: "What we optimize",
    capabilitiesIntro: "Fix the base first, then grow what works.",
    capabilities: [
      {
        icon: "search",
        title: "Technical SEO",
        text: "Fast, crawlable pages with clean URLs, sitemaps and canonicals.",
      },
      {
        icon: "chart",
        title: "Keyword research",
        text: "Find the words your customers use and map them to pages.",
      },
      {
        icon: "code",
        title: "Structured data",
        text: "Schema.org JSON-LD and llms.txt that describe your business.",
      },
      {
        icon: "bot",
        title: "AI visibility (GEO)",
        text: "Answer-first content that AI engines can quote and cite.",
      },
    ],
    outcomes: [
      "An audit with a clear list of fixes",
      "The fixes applied to your site",
      "Search Console and Bing Webmaster set up",
      "A monthly check of rankings and AI answers",
    ],
    productsTitle: "Sites we have optimized",
    connects: [
      "Google Search Console",
      "Bing Webmaster Tools",
      "IndexNow",
      "Schema.org",
      "llms.txt",
      "Lighthouse",
      "PageSpeed Insights",
      "Next.js",
    ],
    faqTitle: "About SEO and GEO",
    faqs: [
      {
        question: "What is GEO (generative engine optimization)?",
        answer:
          "GEO is the work of making your site easy for AI answer engines such as ChatGPT, Perplexity, Gemini and Google AI Overviews to find, understand and cite. It builds on SEO: crawlable pages, clear facts, structured data and direct answers to the questions people ask.",
      },
      {
        question: "What is the difference between SEO and GEO?",
        answer:
          "SEO aims to rank your pages in search results. GEO aims to get your business mentioned and cited inside AI-generated answers. Both need fast, crawlable pages with clear content, so we work on them together.",
      },
      {
        question: "Do I still need SEO if people use ChatGPT?",
        answer:
          "Yes. AI answer engines often draw on pages that search engines can already crawl and trust, so solid SEO is the base that GEO builds on.",
      },
      {
        question: "What is llms.txt?",
        answer:
          "llms.txt is a plain-text file at the root of a site that summarizes the business and links its key pages for AI tools. It is a proposed standard, so we add it alongside a sitemap and structured data, not instead of them.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical fixes can be picked up as soon as search engines recrawl your pages, but rankings usually take weeks to months to move. We agree what to measure with you before we start.",
      },
      faq.howLong,
    ],
    cta: {
      title: "Want to be found on Google and in AI answers?",
      text: "Send us your website. We reply with what to fix first.",
    },
    seo: {
      keyword: "SEO and GEO services",
      title: "SEO & GEO Services: Generative Engine Optimization | Agentix",
      description:
        "SEO and GEO services: technical SEO, keyword research, structured data and llms.txt, so Google and AI engines like ChatGPT and Perplexity can cite you.",
    },
    anchor: "SEO and GEO services",
    whoFor: {
      heading: "Who needs SEO and GEO services?",
      paragraphs: [
        "Businesses whose customers search before they buy, whether on Google or by asking an AI tool such as ChatGPT or Perplexity. If people cannot find you there, they find a competitor.",
        "It fits new sites that are not indexed yet, older sites that load slowly or lost rankings, and any site that AI answer engines do not mention when people ask about its services.",
      ],
    },
    useCases: {
      heading: "What does SEO and GEO work include?",
      intro: "Most projects cover these four areas.",
      items: [
        {
          icon: "search",
          title: "Technical audit",
          text: "Crawling, indexing, speed, canonicals, redirects and broken links, checked page by page.",
        },
        {
          icon: "book",
          title: "Answer-first content",
          text: "Pages that open with a direct answer, then clear headings, tables and FAQs.",
        },
        {
          icon: "code",
          title: "Entity and schema data",
          text: "Organization, Service, FAQ and breadcrumb JSON-LD with the same facts everywhere.",
        },
        {
          icon: "chart",
          title: "Monitoring",
          text: "Search Console, Bing Webmaster and checks of how AI tools describe you.",
        },
      ],
    },
    tools: {
      heading: "Which tools do we use for SEO and GEO?",
      paragraphs: [
        "We check crawling and indexing in Google Search Console and Bing Webmaster Tools, measure speed with Lighthouse and PageSpeed Insights, and submit changed pages with IndexNow. Structured data is written as Schema.org JSON-LD.",
        "For GEO we make sure AI crawlers such as GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot can reach your public pages, add an llms.txt file, and write answer-first content with clear facts, tables and FAQs.",
        "This website is built the same way: server-rendered pages, structured data on every page, an llms.txt file and a robots.txt that welcomes AI crawlers.",
      ],
    },
    comparison: {
      heading: "SEO vs GEO: what is the difference?",
      intro: "GEO builds on SEO. The table shows where each one helps.",
      columns: ["", "SEO", "GEO"],
      rows: [
        ["Goal", "Rank pages in search results", "Get cited in AI-generated answers"],
        [
          "Where it shows",
          "Google and Bing",
          "ChatGPT, Perplexity, Gemini and Google AI Overviews",
        ],
        [
          "Main levers",
          "Keywords, technical health, speed and links",
          "Clear facts, answer-first content, structured data and AI crawler access",
        ],
        [
          "How you measure it",
          "Rankings, clicks and impressions",
          "Mentions and citations in AI answers",
        ],
      ],
    },
    process: { heading: "How do we run an SEO and GEO project?", steps: howWeWork },
    updated: UPDATED,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceLinks = Object.fromEntries(
  services.map((s) => [s.slug, { href: `/services/${s.slug}`, name: s.name, anchor: s.anchor }]),
) as Record<ServiceSlug, { href: string; name: string; anchor: string }>;
