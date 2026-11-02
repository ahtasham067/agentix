import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Facts only from the owner's notes (projects/intro.md).
// TODO: confirm whether UpHex was client or employer work, the owner's role,
// the full stack, any results and a live URL. Until then the page stays noindex
// and out of the sitemap, and it makes no claim about who owns the product.
export const uphex: Project = {
  slug: "uphex",
  name: "UpHex",
  summary: "A web platform for agency ad campaigns.",
  tagline: "Ad campaigns for every client, in one place.",
  description:
    "A platform that helps agencies manage and launch ad campaigns for multiple clients, with an AI ad writer for Facebook and Google ads.",
  answer:
    "UpHex is a platform that helps agencies manage and launch ad campaigns for multiple clients. It includes an AI ad writer that creates Facebook and Google ads, and it lets users build customizable campaigns. The platform was built with Ruby on Rails, the framework Agentix uses for larger web application back ends.",
  tags: ["Web app"],
  stack: "Web",
  category: "web-apps",
  thumbnail: "uphex",
  clientWork: true,
  facts: [
    { label: "Type", value: "Ad campaign platform" },
    { label: "Audience", value: "Agencies" },
    { label: "Stack", value: "Ruby on Rails" },
  ],
  features: [
    {
      icon: "users",
      title: "Multiple clients",
      text: "Agencies manage and launch campaigns for many clients.",
    },
    {
      icon: "bot",
      title: "AI ad writer",
      text: "Creates Facebook and Google ads with AI.",
    },
    {
      icon: "workflow",
      title: "Custom campaigns",
      text: "Users build campaigns that fit each need.",
    },
  ],
  steps: [],
  sections: [],
  faqs: [],
  screenshots: screenshots["uphex"],
  screens: [],
  builtWith: ["Ruby on Rails"],
  relatedServices: ["web-development"],
  relatedProjects: ["autobuffy"],
  seo: {
    keyword: "ad campaign platform for agencies",
    title: "UpHex: Ad Campaign Platform for Agencies | Agentix",
    description:
      "UpHex helps agencies manage and launch ad campaigns for multiple clients, with an AI ad writer for Facebook and Google ads. Built with Ruby on Rails.",
  },
  indexable: false,
  featured: false,
  sortOrder: 6,
  published: true,
};
