import type { Project } from "../types";

// Facts only from the Nexa AI repository README (projects/nexa-ai/README.md).
// TODO: confirm with the owner whether Nexa AI is their own project or client
// work, their role, and whether the page may link the repository. Until then it
// stays noindex and out of the sitemap, and it makes no ownership claim.
export const nexaAi: Project = {
  slug: "nexa-ai",
  name: "Nexa AI",
  summary: "An AI assistant project for online shopping.",
  tagline: "Shop by asking, not by filtering.",
  description:
    "A demonstration store with natural-language search, a shopping assistant that answers from the catalog, comparison, recommendations and image search.",
  answer:
    "Nexa AI is an intelligent shopping prototype: a demonstration store with natural-language search, a shopping assistant that answers only from the product catalog, side-by-side comparison, personalised recommendations and image search. It is built with Next.js 16, FastAPI and PostgreSQL with pgvector, using MiniLM and CLIP embeddings and optional Google Gemini answers.",
  tags: ["AI agent"],
  stack: "AI",
  category: "ai-agents",
  thumbnail: "nexa-ai",
  clientWork: false,
  facts: [
    { label: "Type", value: "Shopping prototype (demo)" },
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
  ],
  faqs: [
    {
      question: "Is Nexa AI a live store?",
      answer:
        "No. It is a demonstration. The catalog comes from the Amazon Berkeley Objects dataset, prices and stock are synthetic values, and payment is always simulated.",
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
  screenshots: [],
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
  relatedProjects: ["clinidesk"],
  seo: {
    keyword: "AI shopping assistant prototype",
    title: "Nexa AI: AI Shopping Assistant Prototype | Agentix",
    description:
      "Nexa AI is an AI shopping assistant prototype with natural-language search, catalog-grounded answers, comparison and image search on Next.js and FastAPI.",
  },
  indexable: false,
  featured: false,
  sortOrder: 2,
  published: true,
};
