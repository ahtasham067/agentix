import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import http from "node:http";
import { projects } from "../../src/content/projects";
import { pageSeo } from "../../src/content/seo";
import { services } from "../../src/content/services";
import { pricingGroups } from "../../src/content/pricing";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
const PORT = Number(process.env.TEST_PORT ?? 3000);

/** Expected keyword and minimum visible words for each indexable path. */
const pages: Record<string, { keyword: string; minWords: number }> = {
  "/": { keyword: pageSeo.home.keyword, minWords: 700 },
  "/products": { keyword: pageSeo.products.keyword, minWords: 400 },
  "/services": { keyword: pageSeo.services.keyword, minWords: 700 },
  "/about": { keyword: pageSeo.about.keyword, minWords: 450 },
  "/contact": { keyword: pageSeo.contact.keyword, minWords: 250 },
  "/privacy": { keyword: pageSeo.privacy.keyword, minWords: 0 },
  "/terms": { keyword: pageSeo.terms.keyword, minWords: 0 },
  "/blog": { keyword: pageSeo.blog.keyword, minWords: 0 },
  ...Object.fromEntries(
    services.map((s) => [`/services/${s.slug}`, { keyword: s.seo.keyword, minWords: 600 }]),
  ),
  ...Object.fromEntries(
    projects
      .filter((p) => p.published && p.indexable)
      .map((p) => [`/products/${p.slug}`, { keyword: p.seo.keyword, minWords: 450 }]),
  ),
};
const noindexPaths = projects
  .filter((p) => p.published && !p.indexable)
  .map((p) => `/products/${p.slug}`);
const privatePaths = ["/design-system", "/products/internal-draft", ...noindexPaths];

const FORBIDDEN_SCHEMA_KEYS = ["aggregateRating", "review", "award", "address"];
const REQUIRED: Record<string, string[]> = {
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Service: ["name", "serviceType", "description", "url", "provider"],
  SoftwareApplication: ["name", "description", "url", "applicationCategory", "operatingSystem"],
  CreativeWork: ["name", "description", "url"],
  WebPage: ["name", "description", "url", "about"],
  ContactPage: ["name", "url"],
  AboutPage: ["name", "url"],
  Person: ["name"],
  Blog: ["name", "url"],
  BlogPosting: [
    "headline",
    "datePublished",
    "dateModified",
    "author",
    "publisher",
    "image",
    "mainEntityOfPage",
  ],
};

const allowedPrices = pricingGroups.flatMap((g) => g.plans.map((p) => p.amount));

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function pathOf(url: string) {
  const path = url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) : new URL(url).pathname;
  return path === "" ? "/" : path;
}

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1]));
}

interface PageReport {
  title: string;
  description: string;
  canonical: string | null;
  robots: string[];
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: string | null;
  h1: string[];
  headings: number[];
  words: number;
  imgsWithoutAlt: number;
  jsonLd: string[];
  faqVisible: { q: string; a: string }[];
  crumbs: string[];
  seoIntro: string;
}

async function inspect(page: Page): Promise<PageReport> {
  return page.evaluate(() => {
    const meta = (sel: string) => document.querySelector(sel)?.getAttribute("content") ?? null;
    const main = document.querySelector("main")!.cloneNode(true) as HTMLElement;
    main.querySelectorAll("script,style").forEach((n) => n.remove());
    const words = (main.textContent ?? "").split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
    return {
      title: document.title,
      description: meta('meta[name="description"]') ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      robots: [...document.querySelectorAll('meta[name="robots"]')].map(
        (m) => m.getAttribute("content") ?? "",
      ),
      ogTitle: meta('meta[property="og:title"]'),
      ogDescription: meta('meta[property="og:description"]'),
      ogImage: meta('meta[property="og:image"]'),
      twitterCard: meta('meta[name="twitter:card"]'),
      h1: [...document.querySelectorAll("h1")].map((h) => h.textContent?.trim() ?? ""),
      headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
        Number(h.tagName[1]),
      ),
      words,
      imgsWithoutAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt"))
        .length,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (s) => s.textContent ?? "",
      ),
      faqVisible: [...document.querySelectorAll("main details")].map((d) => ({
        q: d.querySelector("summary")?.textContent?.trim() ?? "",
        a: d.querySelector("summary + div")?.textContent?.trim() ?? "",
      })),
      crumbs: [...document.querySelectorAll('nav[aria-label="Breadcrumb"] li')].map((li) =>
        (li.textContent ?? "").replace("/", "").trim(),
      ),
      seoIntro: [
        ...document.querySelectorAll("main [data-seo-extra] h2, main [data-seo-extra] h2 + p"),
      ]
        .map((n) => n.textContent ?? "")
        .join(" "),
    };
  });
}

function flattenSchemas(blocks: string[]) {
  const items: Record<string, unknown>[] = [];
  for (const raw of blocks) {
    const parsed = JSON.parse(raw);
    for (const item of Array.isArray(parsed) ? parsed : [parsed]) items.push(item);
  }
  return items;
}

function findKeys(value: unknown, keys: string[], found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => findKeys(v, keys, found));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (keys.includes(k)) found.push(k);
      findKeys(v, keys, found);
    }
  }
  return found;
}

test.describe("sitemap and robots", () => {
  test("sitemap lists every public page and nothing private", async ({ request }) => {
    const paths = await sitemapPaths(request);
    expect(new Set(paths).size, "no duplicates").toBe(paths.length);
    for (const path of Object.keys(pages))
      expect(paths, `sitemap contains ${path}`).toContain(path);
    for (const path of privatePaths) expect(paths, `sitemap excludes ${path}`).not.toContain(path);
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml.match(/<lastmod>/g)?.length).toBe(paths.length);
  });

  test("robots.txt allows the site and blocks private routes", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-Agent: \*/i);
    expect(body).toMatch(/^Allow: \/$/m);
    expect(body).toMatch(/^Disallow: \/api\/$/m);
    expect(body).toMatch(/^Disallow: \/design-system$/m);
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});

test.describe("every indexable page", () => {
  for (const [path, expected] of Object.entries(pages)) {
    test(`${path} is fully optimized`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      const r = await inspect(page);

      expect(r.h1, "exactly one h1").toHaveLength(1);
      expect(r.title.length, `title "${r.title}"`).toBeGreaterThanOrEqual(30);
      expect(r.title.length, `title "${r.title}"`).toBeLessThanOrEqual(60);
      expect(r.description.length, `description "${r.description}"`).toBeGreaterThanOrEqual(120);
      expect(r.description.length, `description "${r.description}"`).toBeLessThanOrEqual(155);
      expect(r.canonical).toBe(path === "/" ? SITE_URL : `${SITE_URL}${path}`);
      expect(r.robots.join(" ")).not.toContain("noindex");
      expect(r.ogTitle).toBeTruthy();
      expect(r.ogDescription).toBeTruthy();
      expect(r.ogImage).toMatch(/opengraph-image/);
      expect(r.twitterCard).toBe("summary_large_image");
      expect(r.imgsWithoutAlt, "images without alt").toBe(0);
      expect(r.words, "visible words").toBeGreaterThanOrEqual(expected.minWords);

      // Headings start at h1 and never skip a level.
      expect(r.headings[0]).toBe(1);
      for (let i = 1; i < r.headings.length; i++) {
        expect(r.headings[i], `heading ${i} after h${r.headings[i - 1]}`).toBeLessThanOrEqual(
          r.headings[i - 1] + 1,
        );
      }

      // Keyword in the title and description, and in the h1 or the SEO intro.
      const kw = normalize(expected.keyword);
      expect(normalize(r.title)).toContain(kw);
      if (expected.minWords > 0) {
        expect(normalize(r.description)).toContain(kw);
        expect(normalize(`${r.h1[0]} ${r.seoIntro}`), "keyword in h1 or SEO intro").toContain(kw);
      }

      // Structured data parses, has the required fields and no invented facts.
      const schemas = flattenSchemas(r.jsonLd);
      expect(schemas.map((s) => s["@type"])).toEqual(
        expect.arrayContaining(["Organization", "WebSite"]),
      );
      for (const s of schemas) {
        const type = s["@type"] as string;
        expect(s["@context"]).toBe("https://schema.org");
        for (const field of REQUIRED[type] ?? []) expect(s[field], `${type}.${field}`).toBeTruthy();
      }
      expect(findKeys(schemas, FORBIDDEN_SCHEMA_KEYS)).toEqual([]);

      // Offers only on Service, only with the configured PKR "starting from" prices.
      for (const s of schemas) {
        if (s["@type"] !== "Service") {
          expect(findKeys(s, ["offers"]), `${s["@type"]} has no offers`).toEqual([]);
          continue;
        }
        for (const offer of (s.offers ?? []) as {
          priceCurrency: string;
          description: string;
          priceSpecification: { priceCurrency: string; minPrice: number };
        }[]) {
          expect(offer.priceCurrency).toBe("PKR");
          expect(offer.priceSpecification.priceCurrency).toBe("PKR");
          expect(offer.description).toMatch(/^Starting from/);
          expect(allowedPrices).toContain(offer.priceSpecification.minPrice);
        }
      }

      // FAQPage mirrors the visible questions and answers.
      const faq = schemas.find((s) => s["@type"] === "FAQPage") as
        { mainEntity: { name: string; acceptedAnswer: { text: string } }[] } | undefined;
      if (r.faqVisible.length) {
        expect(faq, "FAQPage present when an FAQ is shown").toBeTruthy();
        expect(faq!.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))).toEqual(
          r.faqVisible,
        );
      } else {
        expect(faq).toBeUndefined();
      }

      // BreadcrumbList mirrors the visible breadcrumb.
      const crumbs = schemas.find((s) => s["@type"] === "BreadcrumbList") as
        { itemListElement: { name: string; position: number }[] } | undefined;
      if (path !== "/") {
        expect(crumbs, "BreadcrumbList on inner pages").toBeTruthy();
        expect(crumbs!.itemListElement.map((c) => c.name)).toEqual(r.crumbs);
      }
    });
  }
});

test("titles and descriptions are unique across pages", async ({ request }) => {
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  for (const path of Object.keys(pages)) {
    const html = await (await request.get(path)).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    expect(titles.get(title), `${path} repeats the title of ${titles.get(title)}`).toBeUndefined();
    expect(descriptions.get(description), `${path} repeats a description`).toBeUndefined();
    titles.set(title, path);
    descriptions.set(description, path);
  }
});

test.describe("noindex rules", () => {
  for (const path of noindexPaths) {
    test(`${path} is noindex until its details are filled in`, async ({ page }) => {
      await page.goto(path);
      const r = await inspect(page);
      expect(r.robots.join(" ")).toContain("noindex");
    });
  }

  test("the 404 page is noindex", async ({ page }) => {
    const res = await page.goto("/missing-page-for-seo-test");
    expect(res?.status()).toBe(404);
    expect((await inspect(page)).robots.join(" ")).toContain("noindex");
  });
});

test("internal links work, never redirect, and every page is linked", async ({ request }) => {
  const queue = ["/"];
  const visited = new Set<string>();
  const inbound = new Map<string, Set<string>>();
  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status(), `${path} status`).toBe(200);
    const html = await res.text();
    const links = [...html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)].map((m) => m[1]);
    for (const raw of links) {
      const link = raw.length > 1 ? raw.replace(/\/$/, "") : raw;
      if (link.startsWith("/_next")) continue;
      expect(raw, `link to ${raw} on ${path} must not need a trailing-slash redirect`).toBe(link);
      if (!inbound.has(link)) inbound.set(link, new Set());
      if (link !== path) inbound.get(link)!.add(path);
      if (!visited.has(link)) queue.push(link);
    }
  }
  for (const path of await sitemapPaths(request)) {
    expect(visited.has(path), `${path} reachable by links`).toBe(true);
    expect(inbound.get(path)?.size ?? 0, `${path} linked from another page`).toBeGreaterThan(0);
  }
});

test("www redirects to the apex domain with a 301", async () => {
  const res = await new Promise<http.IncomingMessage>((resolve, reject) =>
    http
      .get(
        {
          host: "localhost",
          port: PORT,
          path: "/products",
          headers: { host: "www.agentix.website" },
        },
        resolve,
      )
      .on("error", reject),
  );
  res.resume();
  expect(res.statusCode).toBe(301);
  expect(res.headers.location).toBe("https://agentix.website/products");
});

test.describe("a published blog article", () => {
  const slug = "why-we-build-with-nextjs-and-supabase";
  const admin = () =>
    createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

  test.beforeAll(async () => {
    const { error } = await admin()
      .from("posts")
      .update({ published: true, published_at: new Date().toISOString() })
      .eq("slug", slug);
    if (error) throw error;
  });

  test.afterAll(async () => {
    await admin().from("posts").update({ published: false, published_at: null }).eq("slug", slug);
  });

  test("has article metadata, BlogPosting and a clean outline", async ({ page }) => {
    expect((await page.goto(`/blog/${slug}`))?.status()).toBe(200);
    const r = await inspect(page);
    expect(r.h1).toEqual(["Why we build web apps with Next.js and Supabase"]);
    expect(r.title).toBe("Why We Build Web Apps with Next.js and Supabase | Agentix");
    expect(r.description.length).toBeGreaterThanOrEqual(120);
    expect(r.description.length).toBeLessThanOrEqual(155);
    expect(r.canonical).toBe(`${SITE_URL}/blog/${slug}`);
    expect(r.robots.join(" ")).not.toContain("noindex");
    expect(r.ogImage).toMatch(/opengraph-image/);
    expect(await page.locator('meta[property="og:type"]').getAttribute("content")).toBe("article");
    expect(r.words).toBeGreaterThanOrEqual(900);
    expect(r.headings[0]).toBe(1);
    for (let i = 1; i < r.headings.length; i++) {
      expect(r.headings[i]).toBeLessThanOrEqual(r.headings[i - 1] + 1);
    }
    const schemas = flattenSchemas(r.jsonLd);
    const posting = schemas.find((s) => s["@type"] === "BlogPosting");
    expect(posting).toBeTruthy();
    for (const field of REQUIRED.BlogPosting) expect(posting![field], field).toBeTruthy();
    expect(posting!.headline).toBe(r.h1[0]);
    const crumbs = schemas.find((s) => s["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };
    expect(crumbs.itemListElement.map((c) => c.name)).toEqual(r.crumbs);
  });
});
