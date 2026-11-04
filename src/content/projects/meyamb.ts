import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Client work. Facts from the owner's CV and the owner's answers (2026-11-02):
// the stack is mostly Ruby on Rails; the owner worked mostly as a security
// analyst (the app's security improvements) and also on the front end.
export const meyamb: Project = {
  slug: "meyamb",
  name: "Meyamb",
  summary: "A fintech web app built with Ruby on Rails and Vue.js.",
  tagline: "Cross-border finance for the Central African diaspora.",
  description:
    "A cross-border fintech platform for the Central African diaspora, with a virtual Visa card, bill payments, money transfers and savings vaults.",
  answer:
    "Meyamb is a cross-border fintech platform for the Central African diaspora, with a virtual Visa card, bill payments, money transfers, savings vaults, KYC checks and real-time history, built mostly on Ruby on Rails. On this client project, Agentix founder Ahtasham Naeem worked mainly as a security analyst on the app's security improvements, and also on the front end.",
  tags: ["Fintech", "Rails", "Vue.js"],
  stack: "Rails, Vue.js",
  category: "web-apps",
  thumbnail: "meyamb",
  schemaKind: "software",
  role: "Security analyst and developer",
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
        "Meyamb is client work, and the product belongs to its owners. Agentix founder Ahtasham Naeem worked on it mostly as a security analyst and made the security improvements for the app. Ahtasham also worked on the front end.",
        "The platform is built mostly with Ruby on Rails, with Vue.js and Redis, and ships through AWS CodePipeline.",
      ],
    },
    {
      heading: "Why KYC and real-time history matter in a money app",
      paragraphs: [
        "KYC stands for know your customer. Before someone can hold a card or send money, the platform checks who they are. It protects users from fraud and lets the service work with banks and card networks.",
        "Real-time transaction history matters for the same reason: trust. When people send money home or pay a bill in another country, they want to see straight away that it went through. A virtual card adds a safe way to pay online without exposing a physical card.",
      ],
    },
    {
      heading: "Built for people who manage money across borders",
      paragraphs: [
        "For a diaspora audience, one app that covers a card, bills, transfers and savings means fewer services to juggle. If you are planning a fintech product of your own, our web app development service covers secure back ends, payment integrations and the dashboards around them.",
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
      question: "What was Agentix's role on Meyamb?",
      answer:
        "Agentix founder Ahtasham Naeem worked mostly as a security analyst and made the security improvements for the app. Ahtasham also worked on the front end.",
    },
    {
      question: "What is Meyamb built with?",
      answer: "Mostly Ruby on Rails, with Vue.js and Redis, delivered through AWS CodePipeline.",
    },
    {
      question: "Do you build fintech web apps?",
      answer:
        "Yes. We build secure web apps with Ruby on Rails, Vue.js, React and Next.js, including payment integrations such as Stripe and PayPal. See our web app development service.",
    },
  ],
  screenshots: screenshots["meyamb"],
  screens: [],
  builtWith: ["Ruby on Rails", "Vue.js", "Redis", "AWS CodePipeline"],
  relatedServices: ["web-development"],
  relatedProjects: ["autobuffy", "nizame-taleem", "research-buddy"],
  seo: {
    keyword: "cross-border fintech platform",
    title: "Cross-Border Fintech Platform – Meyamb | Agentix",
    description:
      "Meyamb is a cross-border fintech platform for the Central African diaspora: virtual Visa card, transfers and KYC. Our role: security work and front end.",
  },
  indexable: true,
  featured: false,
  sortOrder: 4,
  published: true,
};
