import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { SERVICE_SLUGS } from "@/content/types";
import { extractToc, readingMinutes, slugify, wordCount } from "@/lib/markdown";
import { loadPosts } from "../../scripts/posts";

const posts = loadPosts();
const internalPaths = new Set([
  "/",
  "/products",
  "/services",
  "/about",
  "/contact",
  "/blog",
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  ...projects.filter((p) => p.published).map((p) => `/products/${p.slug}`),
]);

describe("markdown helpers", () => {
  it("slugifies headings", () => {
    expect(slugify("AI agent vs chatbot: what's the difference?")).toBe(
      "ai-agent-vs-chatbot-whats-the-difference",
    );
    expect(slugify("Next.js & Supabase")).toBe("next-js-and-supabase");
  });

  it("builds a table of contents from h2 and h3 only", () => {
    const toc = extractToc(
      "# Title\n\n## First\n\ntext\n\n### Sub part\n\n```\n## not a heading\n```\n\n## Second",
    );
    expect(toc).toEqual([
      { depth: 2, text: "First", id: "first" },
      { depth: 3, text: "Sub part", id: "sub-part" },
      { depth: 2, text: "Second", id: "second" },
    ]);
  });

  it("estimates reading time", () => {
    expect(readingMinutes("word ".repeat(1100))).toBe(5);
    expect(readingMinutes("short")).toBe(1);
  });
});

describe("blog posts", () => {
  it("has the six planned articles", () => {
    expect(posts.map((p) => p.slug)).toEqual([
      "ai-agent-vs-chatbot",
      "automate-lead-follow-up-with-n8n",
      "n8n-vs-zapier-vs-make",
      "what-is-an-ai-agent",
      "whatsapp-appointment-booking-bot-for-clinics",
      "why-we-build-with-nextjs-and-supabase",
    ]);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s meets the content rules", (_, post) => {
    expect(post.seoTitle.length).toBeGreaterThanOrEqual(30);
    expect(post.seoTitle.length).toBeLessThanOrEqual(60);
    expect(post.seoTitle.endsWith("| Agentix")).toBe(true);
    expect(post.description.length).toBeGreaterThanOrEqual(120);
    expect(post.description.length).toBeLessThanOrEqual(155);

    const words = wordCount(post.body);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(words).toBeLessThanOrEqual(1200);

    // Structure: sections with h2s, no h1 inside the body.
    expect(extractToc(post.body).filter((e) => e.depth === 2).length).toBeGreaterThanOrEqual(5);
    expect(post.body).not.toMatch(/^# /m);

    // Internal links point to real pages and include a service page and the quote form.
    const links = [...post.body.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const link of links) expect(internalPaths.has(link), link).toBe(true);
    expect(links.some((l) => l.startsWith("/services/"))).toBe(true);
    expect(links).toContain("/contact");

    for (const s of post.relatedServices) expect(SERVICE_SLUGS).toContain(s);
    // No price figures in the copy.
    expect(post.body).not.toMatch(/[$€£]\s?\d|\bRs\.?\s?\d/);
  });
});
