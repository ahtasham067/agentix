import type { Project } from "../types";

// TODO: confirm placeholder copy. The owner's CV has no details on UpHex, so
// the detail page stays noindex and out of the sitemap until this is filled in.
export const uphex: Project = {
  slug: "uphex",
  name: "UpHex",
  summary: "A web platform built by the Agentix team.",
  description: "A web platform built by the Agentix team.",
  tags: ["Web app"],
  stack: "Web",
  category: "web-apps",
  thumbnail: "uphex",
  clientWork: false,
  facts: [],
  features: [],
  steps: [],
  sections: [],
  faqs: [],
  screenshots: [],
  screens: [],
  builtWith: [],
  relatedServices: ["web-development"],
  relatedProjects: ["autobuffy"],
  seo: {
    keyword: "UpHex web platform",
    title: "UpHex: A Web Platform Built In-House | Agentix",
    description:
      "UpHex is a web platform built in-house by the Agentix team. Full details are coming soon; ask us about Next.js and Supabase web app development.",
  },
  indexable: false,
  featured: false,
  sortOrder: 6,
  published: true,
};
