import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Facts from the owner's notes (projects/intro.md), the owner's answers
// (2026-11-02: full-stack developer, main scope the Ruby on Rails back end) and
// the owner's screenshots (template library, rebilling dashboard, menu).
// The copy never says which features the owner wrote, only the role.
// TODO: confirm whether UpHex was client or employer work, any results and a live URL.
export const uphex: Project = {
  slug: "uphex",
  name: "UpHex",
  summary: "A web platform for agency ad campaigns.",
  tagline: "Ad campaigns for every client, in one place.",
  description:
    "A platform that helps agencies manage and launch ad campaigns for multiple clients, with an AI ad writer for Facebook and Google ads.",
  answer:
    "UpHex is a platform that helps agencies manage and launch ad campaigns for multiple clients, with an AI ad writer for Facebook and Google ads, a template library and client rebilling. Agentix founder Ahtasham Naeem worked on it as a full-stack developer, mainly on the Ruby on Rails back end.",
  tags: ["Web app"],
  stack: "Web",
  category: "web-apps",
  thumbnail: "uphex",
  schemaKind: "software",
  role: "Full-stack developer, mainly the Ruby on Rails back end",
  clientWork: true,
  facts: [
    { label: "Type", value: "Ad campaign platform" },
    { label: "Audience", value: "Agencies" },
    { label: "Stack", value: "Ruby on Rails" },
    { label: "Ad platforms", value: "Facebook, Instagram, Google" },
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
    {
      icon: "folder",
      title: "Template library",
      text: "Saved and prebuilt ad templates, sorted by platform and category, ready to launch.",
    },
    {
      icon: "card",
      title: "Client rebilling",
      text: "Each client's balance, threshold, fee and recharge amount, with Stripe connected.",
    },
    {
      icon: "chart",
      title: "Reporting",
      text: "Client metrics, template metrics, keyword metrics and search terms.",
    },
  ],
  steps: [],
  sections: [
    {
      heading: "An ad campaign platform for agencies",
      paragraphs: [
        "An agency that runs ads for many businesses has to write the ads, launch the campaigns, follow the results and recover the ad spend from each client. UpHex brings that work into one platform. Its AI ad writer creates Facebook and Google ads, and users can build campaigns that fit each client.",
        "The screens on this page show more of the platform: a template library for Facebook, Instagram and Google ads, a rebilling dashboard for client ad spend, and reports on clients, templates, keywords and search terms.",
      ],
    },
    {
      heading: "Our role on UpHex",
      paragraphs: [
        "UpHex is client work, and the product belongs to its owners. Agentix founder Ahtasham Naeem worked on it as a full-stack developer. The main scope of that work was the Ruby on Rails back end.",
      ],
    },
    {
      heading: "Why agencies use ad templates and rebilling",
      paragraphs: [
        "Agencies reuse what works. A saved ad template keeps an ad ready to launch again for another client, and showing results and cost per result next to each template makes it easier to pick the ones worth reusing.",
        "Rebilling solves a different problem. When an agency pays for ads on behalf of its clients, it has to get that money back. A rebilling setup usually tracks each client's balance and charges a set recharge amount, plus the agency's fee, when the balance falls below a threshold.",
      ],
    },
    {
      heading: "Built with Ruby on Rails",
      paragraphs: [
        "UpHex is built with Ruby on Rails. Rails suits platforms like this one, with many client accounts, background work and connections to ad networks and payment providers. If you are planning a platform for your own agency or clients, our web app development service covers Rails back ends, dashboards and integrations.",
      ],
    },
  ],
  faqs: [
    {
      question: "Who is UpHex for?",
      answer: "Agencies that manage and launch ad campaigns for multiple clients.",
    },
    {
      question: "What does the UpHex AI ad writer do?",
      answer: "It creates Facebook and Google ads with AI.",
    },
    {
      question: "What was Agentix's role on UpHex?",
      answer:
        "Agentix founder Ahtasham Naeem worked on UpHex as a full-stack developer. The main scope was the Ruby on Rails back end.",
    },
    {
      question: "What is UpHex built with?",
      answer: "Ruby on Rails.",
    },
    {
      question: "Can you build an ad campaign platform for an agency?",
      answer:
        "Yes. Tell us how your agency runs campaigns and bills clients today, and we will reply with a plan and a timeline.",
    },
  ],
  screenshots: screenshots["uphex"],
  screens: [],
  builtWith: ["Ruby on Rails"],
  relatedServices: ["web-development"],
  relatedProjects: ["autobuffy", "meyamb", "nizame-taleem"],
  seo: {
    keyword: "ad campaign platform for agencies",
    title: "UpHex: Ad Campaign Platform for Agencies | Agentix",
    description:
      "UpHex is an ad campaign platform for agencies, with an AI ad writer for Facebook and Google ads, ad templates and client rebilling, built on Ruby on Rails.",
  },
  indexable: true,
  featured: false,
  sortOrder: 6,
  published: true,
};
