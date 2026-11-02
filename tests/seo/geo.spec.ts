import { expect, test, type APIRequestContext } from "@playwright/test";
import { projects } from "../../src/content/projects";
import { services } from "../../src/content/services";
import { AI_CRAWLERS } from "../../src/lib/seo/crawlers";
import { contact, SITE_DESCRIPTION, SITE_NAME } from "../../src/content/site";

/** GEO checks: AI answer engines can find, read and cite every public page. */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

async function sitemapUrls(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)![1],
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "",
  }));
}

const pathOf = (url: string) => (url === SITE_URL ? "/" : url.slice(SITE_URL.length));

const answerPages = [
  ...services.map((s) => `/services/${s.slug}`),
  ...projects.filter((p) => p.published && p.indexable).map((p) => `/products/${p.slug}`),
];

test("llms.txt lists every public page as plain text", async ({ request }) => {
  const res = await request.get("/llms.txt");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toMatch(/^text\/plain/);
  const body = await res.text();
  expect(body.startsWith(`# ${SITE_NAME}\n`)).toBe(true);
  expect(body).toContain(`> ${SITE_DESCRIPTION}`);
  expect(body).toContain(contact.email);
  expect(body).toContain(contact.phoneDisplay);
  expect(body).toContain("Rs 5,999");
  for (const { loc } of await sitemapUrls(request)) {
    expect(body, `llms.txt links ${loc}`).toContain(`(${loc})`);
  }
  for (const p of projects.filter((x) => !x.indexable || !x.published)) {
    expect(body, `llms.txt leaves out ${p.slug}`).not.toContain(`/products/${p.slug})`);
  }
});

test("llms-full.txt holds the answers and FAQs", async ({ request }) => {
  const res = await request.get("/llms-full.txt");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toMatch(/^text\/plain/);
  const body = await res.text();
  for (const s of services) {
    expect(body).toContain(s.answer);
    for (const f of s.faqs) expect(body).toContain(f.question);
  }
});

test("robots.txt welcomes AI crawlers on public pages only", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  const groups = body.split(/\n(?=User-Agent:)/i);
  for (const bot of AI_CRAWLERS) {
    const group = groups.find((g) => new RegExp(`^User-Agent: ${bot}$`, "im").test(g));
    expect(group, `${bot} group`).toBeTruthy();
    expect(group).toMatch(/^Allow: \/$/m);
    expect(group).toMatch(/^Disallow: \/api\/$/m);
    expect(group).toMatch(/^Disallow: \/design-system$/m);
  }
});

for (const path of answerPages) {
  test(`${path} opens with a direct answer and its FAQ schema matches the page`, async ({
    page,
  }) => {
    await page.goto(path);
    const facts = await page.evaluate(() => {
      const answer = document.querySelector("main [data-answer]");
      const firstH2 = document.querySelector("main h2");
      const before =
        answer && firstH2
          ? Boolean(answer.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING)
          : false;
      return { text: answer?.textContent?.trim() ?? "", before };
    });
    const words = facts.text.split(/\s+/).filter(Boolean).length;
    expect(words, "answer length").toBeGreaterThanOrEqual(40);
    expect(words, "answer length").toBeLessThanOrEqual(60);
    expect(facts.before, "answer comes before the first h2").toBe(true);

    const visible = await page
      .locator("main details")
      .evaluateAll((els) => els.map((d) => d.querySelector("summary")?.textContent?.trim()));
    expect(visible.length, "page has an FAQ").toBeGreaterThan(0);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = blocks
      .flatMap((b) => [JSON.parse(b)].flat())
      .find((s) => s["@type"] === "FAQPage") as { mainEntity: { name: string }[] };
    expect(faq.mainEntity.map((q) => q.name)).toEqual(visible);
  });
}

test("content is in the server HTML, not only in JavaScript", async ({ request }) => {
  for (const s of services) {
    const html = await (await request.get(`/services/${s.slug}`)).text();
    expect(html).toContain("data-answer");
    expect(html).toContain(s.faqs[0].question.replaceAll("'", "&#x27;"));
  }
  const home = await (await request.get("/")).text();
  expect(home).toContain("Rs 5,999");
  expect(home).toContain(contact.email);
});

test("Organization facts are identical on every page", async ({ request }) => {
  const seen = new Set<string>();
  for (const { loc } of await sitemapUrls(request)) {
    const html = await (await request.get(pathOf(loc))).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const org = blocks
      .flatMap((m) => [JSON.parse(m[1])].flat())
      .find((s) => s["@type"] === "Organization");
    expect(org, `Organization on ${loc}`).toBeTruthy();
    expect(org.name).toBe(SITE_NAME);
    expect(org.description).toBe(SITE_DESCRIPTION);
    expect(org.email).toBe(contact.email);
    expect(org.telephone).toBe(contact.phone);
    expect(org.knowsAbout).toEqual(services.map((s) => s.name));
    seen.add(JSON.stringify(org));
    const person = blocks
      .flatMap((m) => [JSON.parse(m[1])].flat())
      .find((s) => s["@type"] === "Person");
    expect(person?.name, `Person on ${loc}`).toBe("Ahtasham Naeem");
  }
  expect(seen.size, "one Organization everywhere").toBe(1);
});

test("the visible last-updated date matches the sitemap", async ({ request }) => {
  for (const { loc, lastmod } of await sitemapUrls(request)) {
    const html = await (await request.get(pathOf(loc))).text();
    const visible = html.match(/data-last-updated[^>]*>Last updated <time dateTime="([^"]+)"/)?.[1];
    expect(visible, `last-updated date on ${loc}`).toBeTruthy();
    expect(lastmod.slice(0, 10), loc).toBe(visible);
  }
});
