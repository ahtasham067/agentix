import { expect, test, type Page } from "@playwright/test";

async function openMenuIfMobile(page: Page, isMobile: boolean) {
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
}

const navTargets = [
  { label: "Products", url: "/products", h1: "Products we have built" },
  { label: "Services", url: "/services", h1: "What we can build for your business" },
  { label: "About", url: "/about", h1: "We build software that does the work." },
  { label: "Contact", url: "/contact", h1: "Get a quote" },
  { label: "Home", url: "/", h1: "Your repetitive work, handled by AI agents." },
];

test("main navigation goes to the right pages", async ({ page, isMobile }) => {
  await page.goto("/about");
  for (const target of navTargets) {
    await openMenuIfMobile(page, isMobile);
    const nav = page.getByRole("navigation", { name: isMobile ? "Mobile" : "Main" });
    await nav.getByRole("link", { name: target.label, exact: true }).click();
    await expect(page).toHaveURL(target.url);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(target.h1);
  }
});

test("header Get a Quote goes to the quote form", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await openMenuIfMobile(page, true);
    await page.locator("#mobile-menu").getByRole("link", { name: "Get a Quote" }).click();
  } else {
    await page.getByRole("banner").getByRole("link", { name: "Get a Quote" }).click();
  }
  await expect(page).toHaveURL("/contact");
});

test("footer links point to the right pages", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  const expected: Record<string, string> = {
    Home: "/",
    Products: "/products",
    Services: "/services",
    About: "/about",
    Contact: "/contact",
    "AI Agents": "/services/ai-agents",
    "n8n Automation": "/services/n8n-automation",
    "Web Apps": "/services/web-apps",
    "Get a Quote": "/contact",
    Privacy: "/privacy",
    Terms: "/terms",
  };
  for (const [name, href] of Object.entries(expected)) {
    await expect(footer.getByRole("link", { name, exact: true }).first()).toHaveAttribute(
      "href",
      href,
    );
  }
  // Every internal footer link resolves.
  const hrefs = await footer
    .locator('a[href^="/"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
  for (const href of new Set(hrefs)) {
    const res = await page.request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("CTA band buttons go to the quote form and products", async ({ page }) => {
  for (const route of [
    "/",
    "/products",
    "/services",
    "/about",
    "/services/ai-agents",
    "/products/clinidesk",
  ]) {
    await page.goto(route);
    const cta = page.locator('section[aria-labelledby="cta-title"]');
    await expect(cta.getByRole("link", { name: "Get a Quote" })).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(cta.getByRole("link", { name: "View Products" })).toHaveAttribute(
      "href",
      "/products",
    );
  }
  await page.goto("/");
  await page
    .locator('section[aria-labelledby="cta-title"]')
    .getByRole("link", { name: "Get a Quote" })
    .click();
  await expect(page).toHaveURL("/contact");
});

test("hero buttons on the home page work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View Products" }).first().click();
  await expect(page).toHaveURL("/products");
  await page.goto("/");
  await page.getByRole("link", { name: "Our Services" }).click();
  await expect(page).toHaveURL("/services");
});
