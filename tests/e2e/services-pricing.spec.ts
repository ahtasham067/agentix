import { expect, test } from "@playwright/test";
import http from "node:http";
import { formatPlanPrice, PRICING_DISCLAIMER, pricingGroups } from "../../src/content/pricing";
import { services } from "../../src/content/services";

const PORT = Number(process.env.TEST_PORT ?? 3000);
const names = services.map((s) => s.name);

test("home, services, footer and the quote form list the same four services", async ({ page }) => {
  expect(names).toHaveLength(4);

  await page.goto("/");
  const bento = page.locator('section[aria-labelledby="build-title"]');
  for (const s of services) {
    await expect(bento.getByRole("link", { name: s.name, exact: true })).toHaveAttribute(
      "href",
      `/services/${s.slug}`,
    );
  }
  const footer = page.getByRole("contentinfo");
  for (const s of services) {
    await expect(footer.getByRole("link", { name: s.name, exact: true })).toHaveAttribute(
      "href",
      `/services/${s.slug}`,
    );
  }

  await page.goto("/services");
  await expect(page.locator("main h2 a")).toHaveText(names);

  await page.goto("/contact");
  const options = await page
    .getByLabel("Service")
    .locator("option:not([disabled])")
    .allTextContents();
  expect(options).toEqual([...names, "Not sure"]);
});

test("pricing shows the configured prices and one-line disclaimer", async ({ page }) => {
  for (const route of ["/", "/services"]) {
    await page.goto(route);
    const pricing = page.locator("section#pricing");
    for (const group of pricingGroups) {
      await expect(pricing.getByRole("heading", { name: group.title, exact: true })).toBeVisible();
      for (const plan of group.plans) {
        await expect(pricing.locator(`[data-plan="${group.key}-${plan.key}"]`)).toContainText(
          formatPlanPrice(plan).replace(" per month", ""),
        );
      }
    }
    await expect(pricing.locator("[data-pricing-disclaimer]")).toHaveText(PRICING_DISCLAIMER);
  }

  await page.goto("/services/web-development");
  await expect(page.locator("section#pricing")).toContainText("Custom website");
  await expect(page.locator("section#pricing")).not.toContainText("Chatbot");
  await page.goto("/services/chatbots-ai-agents");
  await expect(page.locator("section#pricing")).toContainText("Chatbot");
  await expect(page.locator("section#pricing")).not.toContainText("Custom website");
  for (const slug of ["automation", "seo-geo"]) {
    await page.goto(`/services/${slug}`);
    await expect(page.locator("section#pricing")).toHaveCount(0);
  }
});

test("every Get a Quote pricing button opens the form with service and plan preselected", async ({
  page,
}) => {
  for (const group of pricingGroups) {
    for (const plan of group.plans) {
      await page.goto("/services");
      await page
        .locator(`[data-plan="${group.key}-${plan.key}"]`)
        .getByRole("link", { name: /Get a Quote/ })
        .click();
      await expect(page).toHaveURL(`/contact?service=${group.service}&plan=${plan.key}#quote`);
      await expect(page.getByLabel("Service", { exact: true })).toHaveValue(group.service);
      await expect(page.getByLabel("Plan", { exact: true })).toHaveValue(plan.key);
    }
  }
});

test("unknown prefill values are ignored", async ({ page }) => {
  await page.goto("/contact?service=crypto&plan=lifetime#quote");
  await expect(page.getByLabel("Service", { exact: true })).toHaveValue("");
  await expect(page.getByLabel("Plan", { exact: true })).toHaveValue("");
});

test("each service page opens with a direct answer and a last-updated date", async ({ page }) => {
  for (const s of services) {
    await page.goto(`/services/${s.slug}`);
    await expect(page.locator("[data-answer]")).toHaveText(s.answer);
    await expect(page.locator("[data-last-updated] time")).toHaveAttribute("datetime", s.updated);
  }
});

const OLD_SLUGS: Record<string, string> = {
  "ai-agents": "chatbots-ai-agents",
  "n8n-automation": "automation",
  "web-apps": "web-development",
};

for (const [from, to] of Object.entries(OLD_SLUGS)) {
  test(`/services/${from} redirects to /services/${to} with a 301`, async () => {
    const res = await new Promise<http.IncomingMessage>((resolve, reject) =>
      http
        .get({ host: "localhost", port: PORT, path: `/services/${from}` }, resolve)
        .on("error", reject),
    );
    res.resume();
    expect(res.statusCode).toBe(301);
    expect(res.headers.location).toBe(`/services/${to}`);
  });
}

test("contact details are the real ones, with no placeholders left", async ({ page }) => {
  await page.goto("/contact");
  const main = page.locator("main");
  await expect(main.getByRole("link", { name: "ahtasham067@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:ahtasham067@gmail.com",
  );
  await expect(main.getByRole("link", { name: "+92 302 5889452" })).toHaveAttribute(
    "href",
    "https://wa.me/923025889452",
  );
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "+92 302 5889452" })).toHaveAttribute(
    "href",
    "tel:+923025889452",
  );
  await expect(footer.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute(
    "href",
    "https://wa.me/923025889452",
  );
  for (const route of ["/", "/contact", "/about", "/services"]) {
    const html = await (await page.request.get(route)).text();
    expect(html).not.toContain("hello@agentix.website");
    expect(html).not.toContain("0000000");
    expect(html).not.toContain("ahtashamm067");
  }
});

test("the pricing table fits small screens without scrolling sideways", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/services");
  const table = page.locator("section#pricing [role=region]").first();
  const { scroll, client } = await table.evaluate((el) => ({
    scroll: el.scrollWidth,
    client: el.clientWidth,
  }));
  expect(scroll).toBeLessThanOrEqual(client);
});
