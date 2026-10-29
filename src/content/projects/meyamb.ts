import type { Project } from "../types";

// Client work. Facts from the owner's CV.
// TODO: confirm the exact scope of our work on Meyamb.
export const meyamb: Project = {
  slug: "meyamb",
  name: "Meyamb",
  summary: "A fintech web app built with Ruby on Rails and Vue.js.",
  tagline: "Cross-border finance for the Central African diaspora.",
  description:
    "A cross-border fintech platform for the Central African diaspora, with a virtual Visa card, bill payments, money transfers and savings vaults.",
  tags: ["Fintech", "Rails", "Vue.js"],
  stack: "Rails, Vue.js",
  category: "web-apps",
  thumbnail: "meyamb",
  role: "Platform development with Ruby on Rails and Vue.js",
  audience: "The Central African diaspora",
  clientWork: true,
  facts: [
    { label: "Type", value: "Fintech web app" },
    { label: "Audience", value: "Central African diaspora" },
    { label: "Stack", value: "Rails, Vue.js, Redis" },
    { label: "Delivery", value: "AWS CodePipeline" },
  ],
  features: [
    { icon: "card", title: "Virtual Visa card", text: "Users get a virtual Visa card." },
    { icon: "check", title: "Bill payments", text: "Users pay bills directly from the app." },
    { icon: "send", title: "Money transfers", text: "Users send money across borders." },
    { icon: "vault", title: "Savings vaults", text: "Users set money aside in savings vaults." },
    { icon: "shield", title: "KYC verification", text: "Identity checks verify each user." },
    {
      icon: "clock",
      title: "Real-time history",
      text: "Every transaction shows up as it happens.",
    },
  ],
  steps: [],
  sections: [
    {
      heading: "A cross-border fintech platform for the diaspora",
      paragraphs: [
        "Meyamb serves the Central African diaspora: people who live abroad and still manage money across borders. In one platform they can use a virtual Visa card, pay bills directly, send money, save in vaults and follow every transaction in real time.",
        "Money apps run on trust, so the platform also verifies its users with KYC checks.",
      ],
    },
    {
      heading: "Our role on Meyamb",
      paragraphs: [
        "Meyamb is client work. Agentix founder Ahtasham Naeem worked on the platform. It is built with Ruby on Rails and Vue.js, uses Redis, and ships through AWS CodePipeline.",
      ],
    },
  ],
  faqs: [
    {
      question: "Who is Meyamb for?",
      answer:
        "The Central African diaspora: people who live abroad and manage money across borders.",
    },
    {
      question: "What can Meyamb users do?",
      answer:
        "Use a virtual Visa card, pay bills directly, send money, save in savings vaults, verify their identity with KYC and see their transaction history in real time.",
    },
    {
      question: "What is Meyamb built with?",
      answer: "Ruby on Rails and Vue.js, with Redis, delivered through AWS CodePipeline.",
    },
    {
      question: "Do you build fintech web apps?",
      answer:
        "Yes. We build secure web apps with Ruby on Rails, Vue.js, React and Next.js, including payment integrations such as Stripe and PayPal. See our web app development service.",
    },
  ],
  screenshots: [],
  screens: [],
  builtWith: ["Ruby on Rails", "Vue.js", "Redis", "AWS CodePipeline"],
  relatedServices: ["web-apps"],
  relatedProjects: ["autobuffy", "nizame-taleem", "research-buddy"],
  seo: {
    keyword: "cross-border fintech platform",
    title: "Cross-Border Fintech Platform – Meyamb | Agentix",
    description:
      "Meyamb is a cross-border fintech platform for the Central African diaspora: virtual Visa card, bill payments, money transfers, savings vaults and KYC.",
  },
  indexable: true,
  featured: false,
  sortOrder: 4,
  published: true,
};
