/** Search metadata for fixed pages. Products and posts take theirs from the database. */
export interface PageSeo {
  path: string;
  title: string;
  description: string;
  keyword: string;
  /** Date the page content last changed (sitemap lastModified). */
  lastModified: string;
  /** Short label shown above the title on the Open Graph image. */
  ogLabel: string;
}

export const pageSeo = {
  home: {
    path: "/",
    title: "AI Agents & n8n Automation for Business | Agentix",
    description:
      "Agentix builds AI agents and n8n automation for business: WhatsApp support, bookings and lead follow-up, plus the web apps around them.",
    keyword: "AI agents and n8n automation for business",
    lastModified: "2026-10-30",
    ogLabel: "AI agents · n8n automation · web apps",
  },
  products: {
    path: "/products",
    title: "Software Products Portfolio: AI Agents & Web Apps | Agentix",
    description:
      "Our software products portfolio of AI agents and web apps, from CliniDesk, a WhatsApp booking agent, to a school management system and citation manager.",
    keyword: "software products portfolio",
    lastModified: "2026-10-30",
    ogLabel: "Products",
  },
  services: {
    path: "/services",
    title: "AI Agent, n8n & Web App Development Services | Agentix",
    description:
      "AI agent development, n8n automation and web app development services. One team builds the agent, the workflow and the app, from plan to launch.",
    keyword: "AI agent, n8n and web app development services",
    lastModified: "2026-10-30",
    ogLabel: "Services",
  },
  about: {
    path: "/about",
    title: "Agentix: Software House for AI Agents and Web Apps",
    description:
      "Agentix is a software house in Pakistan building AI agents, n8n automation and web apps, founded by full-stack developer Ahtasham Naeem.",
    keyword: "Agentix software house",
    lastModified: "2026-10-30",
    ogLabel: "About",
  },
  contact: {
    path: "/contact",
    title: "Get a Quote for AI Automation & Web Development | Agentix",
    description:
      "Get a quote for AI automation and web development. Tell us what you want to build or automate and we reply with a plan, a timeline and a price.",
    keyword: "get a quote for AI automation and web development",
    lastModified: "2026-10-30",
    ogLabel: "Get a quote",
  },
  blog: {
    path: "/blog",
    title: "AI Agents & Automation Blog | Agentix",
    description:
      "Practical guides on AI agents, n8n workflow automation, WhatsApp booking bots and Next.js web apps, written by the Agentix team for business owners.",
    keyword: "AI agents and automation blog",
    lastModified: "2026-10-30",
    ogLabel: "Blog",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy for Quote Requests | Agentix",
    description:
      "How Agentix collects, uses and protects the details you send through the quote form, where the data is stored, and how to ask us to delete it.",
    keyword: "privacy policy",
    lastModified: "2026-10-29",
    ogLabel: "Privacy",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use for the Agentix Website",
    description:
      "The terms for using the Agentix website and requesting a quote: what a quote request means, how proposals work, and who owns the names shown.",
    keyword: "terms of use",
    lastModified: "2026-10-29",
    ogLabel: "Terms",
  },
} satisfies Record<string, PageSeo>;
