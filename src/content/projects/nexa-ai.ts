import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Facts from the Nexa AI repository README (projects/nexa-ai/README.md) and the
// owner's answers (2026-11-02): the owner's own personal project (not a
// university project), complete, built full-stack by the owner alone.
// TODO: confirm whether the page may link the repository.
export const nexaAi: Project = {
  slug: "nexa-ai",
  name: "Nexa AI",
  summary: "An AI assistant project for online shopping.",
  tagline: "Shop by asking, not by filtering.",
  description:
    "A complete demo store with natural-language search, a shopping assistant that answers from the catalog, comparison, recommendations and image search. A personal project, built end to end by Agentix founder Ahtasham Naeem.",
  answer:
    "Nexa AI is a complete AI shopping assistant demo store with natural-language search, catalog-grounded answers, side-by-side comparison, recommendations and image search. It is a personal project of Agentix founder Ahtasham Naeem, who built both the Next.js front end and the FastAPI, PostgreSQL and pgvector back end, with MiniLM and CLIP embeddings and optional Google Gemini.",
  tags: ["AI agent"],
  stack: "AI",
  category: "ai-agents",
  thumbnail: "nexa-ai",
  schemaKind: "software",
  role: "Full-stack developer",
  clientWork: false,
  facts: [
    { label: "Type", value: "Personal project (demo store)" },
    { label: "Stack", value: "Next.js, FastAPI, PostgreSQL" },
    { label: "AI", value: "MiniLM, CLIP, optional Gemini" },
    { label: "Catalog", value: "420 demo products" },
  ],
  features: [
    {
      icon: "search",
      title: "Natural-language search",
      text: "Describe what you want in your own words and get matching products.",
    },
    {
      icon: "chat",
      title: "Grounded assistant",
      text: "Answers come from the catalog and are checked before they are shown.",
    },
    {
      icon: "chart",
      title: "Side-by-side comparison",
      text: "Compare products and read a short summary of the differences.",
    },
    {
      icon: "zap",
      title: "Image search",
      text: "Upload a photo and find visually similar products.",
    },
  ],
  steps: [
    { title: "Search or ask", text: "Type a request or ask the shopping assistant." },
    { title: "Compare", text: "Put products side by side and read the summary." },
    { title: "Check out", text: "Place an order in a simulated checkout." },
  ],
  sections: [
    {
      heading: "How the Nexa AI shopping assistant stays accurate",
      paragraphs: [
        "Every generated answer passes a grounding validator before it is shown. The validator checks the cited product IDs, prices, attributes and numbers against the database. A rejected answer is retried once and then replaced by a fallback.",
        "Without a Google Gemini key, the assistant and the comparison summary use non-generative fallbacks: the same retrieval and the same grounded product cards, with a visible notice.",
      ],
    },
    {
      heading: "What Nexa AI is built with",
      paragraphs: [
        "The web app uses Next.js 16 with React 19, TypeScript and Tailwind CSS. The API is Python 3.12 with FastAPI and SQLAlchemy. Products live in PostgreSQL 17 with pgvector, with separate text and image vector tables and exact cosine search.",
        "Text is embedded with all-MiniLM-L6-v2 and images with CLIP ViT-B/32. Google Gemini is optional and is used for assistant answers and comparison summaries.",
      ],
    },
    {
      heading: "Who built Nexa AI",
      paragraphs: [
        "Nexa AI is a personal project of Agentix founder Ahtasham Naeem, and it is complete. Ahtasham built all of it as a full-stack developer: the Next.js front end, the FastAPI back end, the PostgreSQL and pgvector database, and the search and assistant features on top of them.",
        "It is not a live store. The catalog is demo data and checkout is simulated, so the project shows how an AI shopping assistant works from end to end without taking real orders.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is Nexa AI a live store?",
      answer:
        "No. It is a demonstration. The catalog comes from the Amazon Berkeley Objects dataset, prices and stock are synthetic values, and payment is always simulated.",
    },
    {
      question: "Who built Nexa AI?",
      answer:
        "Agentix founder Ahtasham Naeem, as a personal project. Ahtasham built the whole app as a full-stack developer, from the Next.js front end to the FastAPI and PostgreSQL back end.",
    },
    {
      question: "How does Nexa AI image search work?",
      answer:
        "Product images are embedded with CLIP and stored in PostgreSQL with pgvector. A photo is matched against them by cosine similarity.",
    },
    {
      question: "What happens when the AI model is not available?",
      answer:
        "The assistant falls back to the same retrieval and grounded product cards without generated text, and it shows a notice.",
    },
  ],
  screenshots: screenshots["nexa-ai"],
  screens: [],
  builtWith: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "PostgreSQL",
    "pgvector",
    "MiniLM",
    "CLIP",
    "Google Gemini",
  ],
  relatedServices: ["chatbots-ai-agents", "web-development"],
  relatedProjects: ["clinidesk", "naeem-stationery-store"],
  seo: {
    keyword: "AI shopping assistant",
    title: "Nexa AI: AI Shopping Assistant With Image Search | Agentix",
    description:
      "Nexa AI is a complete AI shopping assistant demo store with natural-language and image search, built full-stack on Next.js and FastAPI by Ahtasham Naeem.",
  },
  indexable: true,
  featured: false,
  sortOrder: 2,
  published: true,
};
