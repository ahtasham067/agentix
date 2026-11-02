import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Facts from the owner (2026-11-02). Features checked against the live site
// https://naeemshop.online, the owner's screenshots and the project's code.
// No numbers, prices, ratings or results are claimed.
export const naeemStationeryStore: Project = {
  slug: "naeem-stationery-store",
  name: "Naeem Stationery & General Store",
  summary:
    "The online shop of a stationery and general store in Sahiwal, with WhatsApp orders and same-day delivery.",
  tagline: "A stationery shop in Sahiwal, online.",
  description:
    "A local shop needs an online presence that people in Sahiwal can find and trust.\n\nNaeem Stationery & General Store has a fast Next.js and Supabase website with its products, prices and contact details, set up for local search, social ads and AI discovery.",
  answer:
    "Naeem Stationery & General Store is a live online stationery shop for customers in Sahiwal, Pakistan, mainly students, teachers and schools. Agentix built the website with Next.js, Supabase and Vercel: products by category, search, cash on delivery, same-day delivery and WhatsApp ordering, set up for local search, Meta ads and AI discovery.",
  tags: ["Web app", "Next.js", "Supabase", "E-commerce", "Local business"],
  stack: "Next.js, Supabase, Vercel",
  category: "web-apps",
  thumbnail: "naeem-stationery-store",
  schemaKind: "website",
  websiteUrl: "https://naeemshop.online",
  role: "Full-stack developer: design, development, deployment and marketing setup",
  audience: "Customers in Sahiwal, mainly students, teachers and schools",
  clientWork: false,
  facts: [
    { label: "Type", value: "E-commerce website" },
    { label: "Location", value: "Sahiwal, Pakistan" },
    { label: "Stack", value: "Next.js, Supabase, Vercel" },
    { label: "Status", value: "Live" },
  ],
  features: [
    {
      icon: "folder",
      title: "Shop by category",
      text: "Products are grouped into stationery categories, with a card view and a list view.",
    },
    {
      icon: "search",
      title: "Product search",
      text: "Customers find pens, paper and files by name from the search bar.",
    },
    {
      icon: "card",
      title: "Single piece or pack",
      text: "Some products can be bought one at a time or as a pack.",
    },
    {
      icon: "clock",
      title: "Same-day delivery",
      text: "Customers pay cash on delivery, and orders arrive the same day across Sahiwal.",
    },
    {
      icon: "chat",
      title: "Order on WhatsApp",
      text: "Customers can type their list or send a photo of it on WhatsApp.",
    },
    {
      icon: "chart",
      title: "Admin panel",
      text: "The owner manages products, categories and orders, with Excel import and export.",
    },
  ],
  steps: [
    { title: "Customer browses", text: "They find products by category or by search." },
    {
      title: "Customer orders",
      text: "They check out with cash on delivery, or send their list on WhatsApp.",
    },
    {
      title: "Shop delivers",
      text: "The order shows in the admin panel and goes out the same day.",
    },
  ],
  sections: [
    {
      heading: "A stationery shop website in Sahiwal",
      paragraphs: [
        "Naeem Stationery & General Store is a real stationery and general store in Sahiwal, Pakistan. It is the family shop of Agentix founder Ahtasham Naeem. Most of its customers are students, teachers and schools buying stationery.",
        "A local shop needs an online presence that people in Sahiwal can find and trust: its real products, its prices, its address and a simple way to order. Without a website, the shop is hard to find for anyone who looks online first.",
      ],
    },
    {
      heading: "What the website does",
      paragraphs: [
        "naeemshop.online is a fast website built with Next.js, with a Supabase backend, hosted on Vercel. It lists the shop's products by category, with search, and shows the shop's address, opening hours and WhatsApp number.",
        "Customers can order in two ways: add products to the cart and check out, or send their list on WhatsApp as text or as a photo.",
      ],
      bullets: [
        "Cash on delivery and same-day delivery across Sahiwal",
        "Ordering on WhatsApp, typed or as a photo of the list",
        "Order tracking",
        "Customer accounts and a wishlist",
        "Return policy, FAQ and contact pages",
        "An admin panel for products, categories, orders and manual orders",
      ],
    },
    {
      heading: "How people in Sahiwal find the shop",
      paragraphs: [
        "The website is set up for local search. The shop also runs its own Facebook page and Meta ads aimed at schools, teachers and students in Sahiwal, with the Meta Pixel set up to measure them.",
        "Generative Engine Optimization (GEO) is planned next, so that AI assistants can recommend the shop when someone asks where to buy stationery in Sahiwal.",
      ],
    },
    {
      heading: "What Agentix did",
      paragraphs: [
        "Ahtasham Naeem worked on it as the full-stack developer: the design, the Next.js front end, the Supabase backend, deployment on Vercel, and the marketing setup, including the Meta Pixel.",
      ],
    },
  ],
  faqs: [
    {
      question: "Who is the Naeem Stationery website for?",
      answer:
        "Customers in Sahiwal, mainly students, teachers and schools who buy stationery from the shop.",
    },
    {
      question: "How do customers order from the website?",
      answer:
        "They add products to the cart and check out with cash on delivery, and orders are delivered the same day across Sahiwal. They can also send their list on WhatsApp, typed or as a photo.",
    },
    {
      question: "What is the stationery shop website built with?",
      answer:
        "Next.js for the website, Supabase for the backend and database, and Vercel for hosting.",
    },
    {
      question: "How do people in Sahiwal find the shop online?",
      answer:
        "Through local search, the shop's Facebook page and Meta ads aimed at schools, teachers and students in Sahiwal. GEO is planned next, so AI assistants can recommend the shop too.",
    },
  ],
  screenshots: screenshots["naeem-stationery-store"],
  screens: [],
  builtWith: ["Next.js", "Supabase", "Vercel", "Meta Pixel"],
  relatedServices: ["web-development", "seo-geo"],
  relatedProjects: ["nexa-ai", "autobuffy", "clinidesk"],
  seo: {
    keyword: "stationery shop website in Sahiwal",
    title: "Stationery Shop Website in Sahiwal – Naeem Store | Agentix",
    description:
      "A stationery shop website in Sahiwal for Naeem Stationery & General Store: Next.js and Supabase, with WhatsApp orders and same-day delivery.",
  },
  indexable: true,
  featured: false,
  sortOrder: 8,
  published: true,
};
