import { expect, test } from "@playwright/test";

test("filter chips show the matching products", async ({ page }) => {
  await page.goto("/products");
  const filters = page.getByRole("group", { name: "Filter products" });
  const names = () => page.locator("[data-product] h3").allTextContents();

  await expect(filters.getByRole("button", { name: "All 7" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(await names()).toHaveLength(7);

  await filters.getByRole("button", { name: "AI Agents" }).click();
  await expect(filters.getByRole("button", { name: "AI Agents" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(await names()).toEqual(["CliniDesk", "Nexa AI"]);

  await filters.getByRole("button", { name: "Web Apps" }).click();
  expect(await names()).toEqual([
    "AutoBuffy",
    "Meyamb",
    "Research Buddy",
    "UpHex",
    "Nizame-Taleem",
  ]);

  await filters.getByRole("button", { name: "Automation" }).click();
  expect(await names()).toEqual(["CliniDesk"]);

  await filters.getByRole("button", { name: "All 7" }).click();
  expect(await names()).toHaveLength(7);
});

test("product cards link to their detail pages", async ({ page }) => {
  await page.goto("/products");
  const cards = page.locator("[data-product]");
  const slugs = await cards.evaluateAll((els) => els.map((e) => e.getAttribute("data-product")!));
  expect(slugs).toHaveLength(7);
  for (const slug of slugs) {
    await page.goto("/products");
    const card = page.locator(`[data-product="${slug}"]`);
    const name = await card.locator("h3").textContent();
    await card.getByRole("link", { name: /View details/ }).click();
    await expect(page).toHaveURL(`/products/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name!);
  }
});

test("the stats band shows the published product count", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("products in our portfolio")).toBeVisible();
  const value = page.locator("dl div", { hasText: "products in our portfolio" }).locator("dd");
  await expect(value).toHaveText("7");
});
