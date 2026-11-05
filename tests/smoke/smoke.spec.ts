// Post-deploy smoke test. Runs against SMOKE_BASE_URL (production) after every
// deployment and nightly, and against the local production build in Chromium,
// WebKit and Firefox in CI. It never saves or emails a quote: the form is sent
// with the x-smoke-test header, which the server only honors with the right token.
import { expect, test, type Page } from "@playwright/test";
import { TEST_SMOKE_TOKEN } from "../../scripts/test-mail-env.mjs";

const REMOTE = Boolean(process.env.SMOKE_BASE_URL);
const TOKEN = REMOTE ? process.env.SMOKE_TEST_TOKEN : TEST_SMOKE_TOKEN;

const REQUIRED_HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

/** Paths listed in the sitemap, read relative to whatever host serves it. */
async function sitemapPaths(page: Page): Promise<string[]> {
  const res = await page.request.get("/sitemap.xml");
  expect(res.status(), "sitemap.xml status").toBe(200);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(locs.length, "URLs in the sitemap").toBeGreaterThan(5);
  return [...new Set(locs)];
}

test("@smoke every page in the sitemap returns 200 without console errors", async ({ page }) => {
  test.setTimeout(180_000);
  const paths = await sitemapPaths(page);
  const failures: string[] = [];
  for (const path of paths) {
    const errors = trackErrors(page);
    const response = await page.goto(path, { waitUntil: "load" });
    if (response?.status() !== 200) failures.push(`${path}: HTTP ${response?.status()}`);
    await page.waitForTimeout(300);
    for (const e of errors) failures.push(`${path}: console error: ${e}`);
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
  }
  expect(failures).toEqual([]);
});

test("@smoke security headers are present", async ({ request }) => {
  const res = await request.get("/");
  expect(res.status()).toBe(200);
  const headers = res.headers();
  const missing = REQUIRED_HEADERS.filter((h) => !headers[h]);
  expect(missing, "missing security headers").toEqual([]);
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toContain("max-age=");
});

test("@smoke robots.txt, sitemap.xml and llms.txt are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/Sitemap:\s*\S+sitemap\.xml/i);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");

  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  expect((await llms.text()).length).toBeGreaterThan(200);
});

test("@smoke the quote form works (smoke flag: nothing is saved or emailed)", async ({ page }) => {
  test.skip(!TOKEN, "SMOKE_TEST_TOKEN is not set");
  await page.setExtraHTTPHeaders({ "x-smoke-test": TOKEN! });
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Smoke Test");
  await page.getByLabel("Email", { exact: true }).fill("smoke-test@example.com");
  await page.getByLabel("Service", { exact: true }).selectOption("web-development");
  await page.getByLabel("Plan", { exact: true }).selectOption("one-time");
  await page.getByLabel("Budget range").selectOption("not-sure");
  await page
    .getByLabel("Project details")
    .fill("Automated smoke test after a deployment. Please ignore.");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByTestId("quote-success")).toContainText("Thanks, Smoke.");
});

test("@smoke www and http redirect to the https apex with a 301", async ({ request, baseURL }) => {
  const url = new URL(baseURL!);
  test.skip(
    url.protocol !== "https:" || /(^|\.)vercel\.app$|^localhost$|^127\./.test(url.hostname),
    "needs the custom domain (not localhost or *.vercel.app)",
  );
  const www = await request.get(`https://www.${url.hostname}/about`, { maxRedirects: 0 });
  expect(www.status()).toBe(301);
  expect(www.headers()["location"]).toBe(`https://${url.hostname}/about`);

  const http = await request.get(`http://${url.hostname}/about`, { maxRedirects: 0 });
  expect([301, 308]).toContain(http.status());
  expect(http.headers()["location"]).toMatch(new RegExp(`^https://${url.hostname}/about`));
});
