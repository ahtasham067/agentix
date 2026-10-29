import type { Project } from "../types";

// TODO: confirm placeholder copy. The owner's CV has no details on Nexa AI, so
// the detail page stays noindex and out of the sitemap until this is filled in.
export const nexaAi: Project = {
  slug: "nexa-ai",
  name: "Nexa AI",
  summary: "An AI assistant project built in-house by the Agentix team.",
  description: "An AI assistant project built in-house by the Agentix team.",
  tags: ["AI agent"],
  stack: "AI",
  category: "ai-agents",
  thumbnail: "nexa-ai",
  clientWork: false,
  facts: [],
  features: [],
  steps: [],
  sections: [],
  faqs: [],
  screenshots: [],
  screens: [],
  builtWith: [],
  relatedServices: ["ai-agents"],
  relatedProjects: ["clinidesk"],
  seo: {
    keyword: "in-house AI assistant",
    title: "Nexa AI: AI Assistant Built In-House | Agentix",
    description:
      "Nexa AI is an AI assistant project built in-house by the Agentix team. Full details are coming soon; ask us about custom AI agents for your business.",
  },
  indexable: false,
  featured: false,
  sortOrder: 2,
  published: true,
};
