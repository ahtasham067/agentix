import type { Project } from "../types";

// Client work. Facts from the owner's CV. The store has vehicle-fitment search;
// the CV does not say we built that search, so the copy never claims it.
export const autobuffy: Project = {
  slug: "autobuffy",
  name: "AutoBuffy",
  summary: "An online auto parts store with secure payments and a Rails API backend.",
  tagline: "Auto parts e-commerce with vehicle-fitment search.",
  description:
    "An online auto parts store with secure payments and a Rails API backend. Shoppers search a catalog of more than 1.2 million parts by vehicle fitment.",
  answer:
    "AutoBuffy is an online auto parts store where shoppers search more than 1.2 million parts by vehicle fitment. It runs on a Ruby on Rails API backend with PayPal, Apple Pay, Afterpay and Klarna at checkout. On this client project, Agentix founder Ahtasham Naeem built RESTful APIs, payments, analytics, database tuning and deployments.",
  tags: ["Web app", "Rails", "Payments"],
  stack: "Ruby on Rails",
  category: "web-apps",
  thumbnail: "autobuffy",
  role: "RESTful APIs, payments, analytics, database optimization and deployments",
  audience: "Online auto parts shoppers",
  clientWork: true,
  facts: [
    { label: "Type", value: "E-commerce web app" },
    { label: "Industry", value: "Auto parts" },
    { label: "Stack", value: "Ruby on Rails" },
    { label: "Our role", value: "APIs, payments, deployments" },
  ],
  features: [
    {
      icon: "search",
      title: "Vehicle-fitment search",
      text: "Shoppers find parts that fit their vehicle in a catalog of 1.2M+ parts.",
    },
    {
      icon: "code",
      title: "RESTful APIs",
      text: "A Ruby on Rails API backend serves the store.",
    },
    {
      icon: "card",
      title: "Flexible payments",
      text: "PayPal, Apple Pay, Afterpay and Klarna at checkout.",
    },
    {
      icon: "chart",
      title: "Analytics and tuning",
      text: "Analytics integration and database optimization for a large catalog.",
    },
  ],
  steps: [],
  sections: [
    {
      heading: "An auto parts e-commerce platform at catalog scale",
      paragraphs: [
        "AutoBuffy is an online auto parts store. Its catalog holds more than 1.2 million parts, and shoppers use vehicle-fitment search to find the parts that fit their vehicle.",
        "A store of this size needs an API backend that stays fast as the catalog grows, and a checkout that offers the payment methods people already use.",
      ],
    },
    {
      heading: "Our role on AutoBuffy",
      paragraphs: [
        "AutoBuffy is client work. Agentix founder Ahtasham Naeem worked on the backend and the checkout:",
      ],
      bullets: [
        "Built RESTful APIs in Ruby on Rails",
        "Integrated PayPal, Apple Pay, Afterpay and Klarna",
        "Integrated analytics",
        "Optimized the database",
        "Handled releases and deployments",
      ],
    },
    {
      heading: "What vehicle-fitment search means for a parts store",
      paragraphs: [
        "In auto parts e-commerce, the hard question is not price but fit. A brake pad or filter that suits one model year can be wrong for the next. Fitment search starts from the shopper's vehicle, usually its year, make and model, and only then shows the parts that match it.",
        "That changes how the back end has to work. Every search filters a very large catalog by compatibility, so queries must stay fast and the data must stay consistent. It is also why a store like this needs careful database work as the catalog grows, which was part of our role on AutoBuffy.",
      ],
    },
    {
      heading: "Payments shoppers expect",
      paragraphs: [
        "Car parts can be expensive, so payment choice matters at checkout. AutoBuffy offers PayPal and Apple Pay for speed, and Afterpay and Klarna for shoppers who prefer to split a larger order into instalments.",
      ],
    },
  ],
  faqs: [
    {
      question: "What did Agentix work on for AutoBuffy?",
      answer:
        "Agentix founder Ahtasham Naeem built the RESTful APIs in Ruby on Rails, integrated payments and analytics, optimized the database and handled deployments.",
    },
    {
      question: "Which payment methods does AutoBuffy support?",
      answer: "PayPal, Apple Pay, Afterpay and Klarna.",
    },
    {
      question: "What is vehicle-fitment search?",
      answer:
        "It lets shoppers choose their vehicle and see the parts that fit it. In a catalog of more than 1.2 million parts, it helps people avoid ordering a part that does not fit.",
    },
    {
      question: "Can you build a similar online store?",
      answer:
        "Yes. We build e-commerce web apps with Ruby on Rails or Next.js, including payment integrations. See our web app development service or ask for a quote.",
    },
  ],
  screenshots: [],
  screens: [],
  builtWith: ["Ruby on Rails", "RESTful APIs", "PayPal", "Apple Pay", "Afterpay", "Klarna"],
  relatedServices: ["web-development"],
  relatedProjects: ["meyamb", "research-buddy", "nizame-taleem"],
  seo: {
    keyword: "auto parts e-commerce platform",
    title: "Auto Parts E-Commerce Platform – AutoBuffy | Agentix",
    description:
      "AutoBuffy is an auto parts e-commerce platform with vehicle-fitment search across 1.2M+ parts, Rails APIs and PayPal, Apple Pay and Klarna checkout.",
  },
  indexable: true,
  featured: false,
  sortOrder: 3,
  published: true,
};
