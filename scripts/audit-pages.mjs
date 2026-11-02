// Click-through audit of every public page at 390, 768 and 1440 px.
// Usage: npm run build && npm start (or any server), then
//   node scripts/audit-pages.mjs [baseUrl]
// Writes screenshots and audit.json to test-results/audit/ and exits 1 on problems.
import { chromium } from "@playwright/test";
import fs from "node:fs";

const BASE = (process.argv[2] || process.env.BASE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);
const OUT = "test-results/audit";
const WIDTHS = [390, 768, 1440];
const TAB_STOPS = 40;

fs.mkdirSync(OUT, { recursive: true });

async function sitemapRoutes() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  // Also audit noindex product pages, the 404 and the confirmation-free contact flow.
  return [
    ...new Set([...paths, "/products/nexa-ai", "/products/uphex", "/missing-page-for-audit"]),
  ];
}

const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
const routes = await sitemapRoutes();
const problems = [];
const report = [];
const linkStatus = new Map();

async function checkLink(href) {
  if (linkStatus.has(href)) return linkStatus.get(href);
  const res = await fetch(`${BASE}${href}`, { redirect: "manual" });
  linkStatus.set(href, res.status);
  return res.status;
}

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  for (const route of routes) {
    const messages = [];
    const onConsole = (m) => {
      if (m.type() === "error" || m.type() === "warning") messages.push(`${m.type()}: ${m.text()}`);
    };
    const onError = (e) => messages.push(`pageerror: ${e.message}`);
    page.on("console", onConsole);
    page.on("pageerror", onError);

    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const facts = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      // Elements that stick out past the right edge (ignoring scroll boxes).
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.right <= doc.clientWidth + 1) return false;
          for (let p = el.parentElement; p; p = p.parentElement) {
            const s = getComputedStyle(p);
            if (s.overflowX === "auto" || s.overflowX === "hidden" || s.overflowX === "clip")
              return false;
          }
          return true;
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")}`);
      const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
      const blank = [...document.querySelectorAll('a[target="_blank"]')]
        .filter((a) => !/noopener/.test(a.rel) || !/noreferrer/.test(a.rel))
        .map((a) => a.href);
      const emptyLinks = [...document.querySelectorAll("a[href], button")]
        .filter((el) => !(el.textContent || "").trim() && !el.getAttribute("aria-label"))
        .map((el) => el.outerHTML.slice(0, 80));
      return {
        overflow,
        wide,
        links,
        blank,
        emptyLinks,
        h1: document.querySelectorAll("h1").length,
      };
    });

    // Keyboard: tab through the first stops; each focused element must show a visible focus style.
    const noFocusStyle = [];
    await page.keyboard.press("Tab");
    for (let i = 0; i < TAB_STOPS; i++) {
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        const visible =
          (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) ||
          s.boxShadow !== "none" ||
          el.matches(":focus-visible") === false;
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().slice(0, 30),
          visible,
        };
      });
      if (info && !info.visible) noFocusStyle.push(`${info.tag} "${info.text}"`);
      await page.keyboard.press("Tab");
    }

    // Small screens skip painting offscreen sections (content-visibility: auto);
    // paint everything so the full-page screenshot shows the whole page.
    await page.addStyleTag({ content: "main > *{content-visibility:visible!important}" });
    const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}`;
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });

    const internal = [
      ...new Set(facts.links.filter((h) => h.startsWith("/") && !h.startsWith("//"))),
    ];
    const broken = [];
    for (const href of internal) {
      const path = href.split("#")[0] || route;
      const status = await checkLink(path);
      if (status >= 400) broken.push(`${href} (${status})`);
    }

    const entry = {
      route,
      width,
      status: res?.status(),
      h1: facts.h1,
      overflow: facts.overflow,
      wide: facts.wide,
      console: messages,
      broken,
      blankWithoutNoreferrer: facts.blank,
      unnamedControls: facts.emptyLinks,
      noFocusStyle,
    };
    report.push(entry);
    const expectedStatus = route === "/missing-page-for-audit" ? 404 : 200;
    if (entry.status !== expectedStatus) problems.push(`${route}@${width}: status ${entry.status}`);
    if (entry.h1 !== 1) problems.push(`${route}@${width}: ${entry.h1} h1 elements`);
    if (entry.overflow > 0)
      problems.push(`${route}@${width}: overflow ${entry.overflow}px ${entry.wide}`);
    for (const m of messages) {
      // The 404 page's own document request is expected to fail with 404.
      if (expectedStatus === 404 && m.includes("status of 404")) continue;
      problems.push(`${route}@${width}: ${m}`);
    }
    for (const b of broken) problems.push(`${route}@${width}: broken link ${b}`);
    for (const b of facts.blank)
      problems.push(`${route}@${width}: target=_blank without noopener noreferrer ${b}`);
    for (const u of facts.emptyLinks) problems.push(`${route}@${width}: unnamed control ${u}`);
    for (const f of noFocusStyle) problems.push(`${route}@${width}: no visible focus on ${f}`);

    page.off("console", onConsole);
    page.off("pageerror", onError);
  }
  await page.close();
}

// Every form on the site: submit empty and check the errors appear.
const formPage = await browser.newPage({ viewport: { width: 390, height: 900 } });
await formPage.goto(`${BASE}/contact`);
await formPage.getByRole("button", { name: "Send request" }).click();
const errorCount = await formPage.locator('[id$="-error"]').count();
if (errorCount < 5)
  problems.push(`/contact form: expected field errors on empty submit, saw ${errorCount}`);
report.push({ form: "/contact", emptySubmitErrors: errorCount });

await browser.close();
fs.writeFileSync(`${OUT}/audit.json`, JSON.stringify({ routes, report, problems }, null, 2));
console.log(`Audited ${routes.length} routes at ${WIDTHS.join(", ")} px.`);
if (problems.length) {
  console.log(`${problems.length} problem(s):\n- ${[...new Set(problems)].join("\n- ")}`);
  process.exit(1);
}
console.log("No problems found.");
