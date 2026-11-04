import { legalUpdated } from "./legal";

/** Search metadata for fixed pages. Products take theirs from the database. */
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
    title: "AI Chatbots, Automation & Web Development | Agentix",
    description:
      "Agentix builds AI chatbots, automation and web development for business, plus SEO and GEO, so customers find you on Google and in AI answers.",
    keyword: "AI chatbots, automation and web development",
    lastModified: "2026-11-02",
    ogLabel: "Chatbots · automation · web · SEO and GEO",
  },
  products: {
    path: "/products",
    title: "Software Products Portfolio: AI Agents & Web Apps | Agentix",
    description:
      "Our software products portfolio of AI agents and web apps, from CliniDesk, a WhatsApp booking agent, to a school management system and citation manager.",
    keyword: "software products portfolio",
    lastModified: "2026-11-02",
    ogLabel: "Products",
  },
  services: {
    path: "/services",
    title: "AI Chatbot, Automation, Web & SEO Services | Agentix",
    description:
      "AI chatbot, automation, web and SEO services from one team: chatbots and agents, n8n and Make.com workflows, web development, and SEO and GEO.",
    keyword: "AI chatbot, automation, web and SEO services",
    lastModified: "2026-11-02",
    ogLabel: "Services",
  },
  about: {
    path: "/about",
    title: "Agentix Software House: AI, Automation, Web & SEO",
    description:
      "The Agentix software house builds chatbots, AI agents, automation, websites, and SEO and GEO. Meet founder Ahtasham Naeem and see how we work.",
    keyword: "Agentix software house",
    lastModified: "2026-11-02",
    ogLabel: "About",
  },
  contact: {
    path: "/contact",
    title: "Get a Quote for AI Automation & Web Development | Agentix",
    description:
      "Get a quote for AI automation and web development. Tell us what you want to build or automate and we reply with a plan, a timeline and a price.",
    keyword: "get a quote for AI automation and web development",
    lastModified: "2026-11-02",
    ogLabel: "Get a quote",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy for Quote Requests | Agentix",
    description:
      "How Agentix collects, uses and protects the details you send through the quote form, where the data is stored, and how to ask us to delete it.",
    keyword: "privacy policy",
    lastModified: legalUpdated,
    ogLabel: "Privacy",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use for the Agentix Website",
    description:
      "The terms for using the Agentix website and requesting a quote: what a quote request means, how proposals work, and who owns the names shown.",
    keyword: "terms of use",
    lastModified: legalUpdated,
    ogLabel: "Terms",
  },
} satisfies Record<string, PageSeo>;
