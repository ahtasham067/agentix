import { expect, test, type Page } from "@playwright/test";
import { projects } from "../../src/content/projects";
import { seriousA11yViolations, staticRoutes, trackErrors } from "./helpers";

// The seed is generated from the content files (a unit test keeps them in sync).
const productSlugs = projects.filter((p) => p.published).map((p) => p.slug);
const routes = [...staticRoutes, ...productSlugs.map((s) => `/products/${s}`)];

for (const route of routes) {
  test(`${route} loads without errors and passes axe`, async ({ page }) => {
    const errors = trackErrors(page);
    const response = await page.goto(route);
    expect(response?.status(), "HTTP status").toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.waitForLoadState("networkidle");
    expect(errors, "console errors").toEqual([]);
    expect(await seriousA11yViolations(page), "serious or critical axe violations").toEqual([]);
    expect(await horizontalOverflow(page), "horizontal overflow (px)").toBe(0);
  });
}

async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

test("no page scrolls sideways at 360, 390 and 768px", async ({ page, isMobile }) => {
  test.skip(isMobile, "the mobile project checks its own width above");
  for (const width of [360, 390, 768]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of routes) {
      await page.goto(route);
      expect(await horizontalOverflow(page), `${route} at ${width}px`).toBe(0);
    }
  }
});

test("unknown pages return the custom 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page does not exist.");
  const robots = await page
    .locator('meta[name="robots"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("content")));
  expect(robots.some((c) => c?.includes("noindex"))).toBe(true);
  await expect(page.getByRole("link", { name: "Custom AI agent development" })).toHaveAttribute(
    "href",
    "/services/ai-agents",
  );
  expect(await seriousA11yViolations(page)).toEqual([]);
});

test("unknown product and service slugs return 404", async ({ page }) => {
  expect((await page.goto("/products/not-a-product"))?.status()).toBe(404);
  expect((await page.goto("/products/internal-draft"))?.status()).toBe(404);
  expect((await page.goto("/services/not-a-service"))?.status()).toBe(404);
});

test("the dev-only design system route is not public", async ({ page }) => {
  expect((await page.goto("/design-system"))?.status()).toBe(404);
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toContain("object-src 'none'");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["x-powered-by"]).toBeUndefined();
});
