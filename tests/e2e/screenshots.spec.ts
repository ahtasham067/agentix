import { expect, test, type Page } from "@playwright/test";

/** Published product slugs, read from the grid so the list follows the database. */
async function productSlugs(page: Page) {
  await page.goto("/products");
  return page
    .locator("[data-product]")
    .evaluateAll((els) => els.map((e) => e.getAttribute("data-product")!));
}

test("every product card shows a real picture with alt text", async ({ page }) => {
  await page.goto("/products");
  const cards = page.locator("[data-product]");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const img = cards.nth(i).locator("[data-visual-mask] img");
    await expect(img).toHaveCount(1);
    expect((await img.getAttribute("alt"))?.trim().length).toBeGreaterThan(20);
    expect(await img.getAttribute("src")).toContain("projects");
  }
  // Only the first card loads its picture at once.
  await expect(cards.nth(0).locator("img")).toHaveAttribute("loading", "eager");
  await expect(cards.nth(1).locator("img")).toHaveAttribute("loading", "lazy");
});

test("product pages give every image alt text and keep layout stable", async ({ page }) => {
  test.setTimeout(240_000); // visits and scrolls every product page
  for (const slug of await productSlugs(page)) {
    await page.goto(`/products/${slug}`);
    await page.evaluate(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        })[]) {
          if (!entry.hadRecentInput) (window as unknown as { __cls: number }).__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    // Scroll through the page so every lazy picture loads.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForLoadState("networkidle");

    const alts = await page
      .locator("main img")
      .evaluateAll((els) => els.map((e) => e.getAttribute("alt")));
    expect(alts.length, slug).toBeGreaterThan(0);
    for (const alt of alts) expect(alt?.trim(), slug).toBeTruthy();

    const shots = page.locator('section[aria-labelledby="screens-title"] figure');
    expect(await shots.count(), slug).toBeGreaterThanOrEqual(2);

    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    expect(cls, `${slug} cumulative layout shift`).toBeLessThan(0.1);
  }
});

test("the screens gallery opens and closes with the keyboard", async ({ page }) => {
  await page.goto("/products/clinidesk");
  const section = page.locator('section[aria-labelledby="screens-title"]');
  const first = section.getByRole("link").first();
  const dialog = page.getByRole("dialog");

  await first.focus();
  await page.keyboard.press("Enter");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("img")).toHaveAttribute("alt", /CliniDesk/);
  const close = dialog.getByRole("button", { name: "Close" });
  await expect(close).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(dialog).toBeVisible();
  await close.focus();
  await page.keyboard.press("Enter");
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test("the gallery links work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/products/clinidesk");
  const href = await page
    .locator('section[aria-labelledby="screens-title"] a')
    .first()
    .getAttribute("href");
  expect(href).toMatch(/^\/projects\/clinidesk\/.+\.webp$/);
  const res = await page.request.get(href!);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/webp");
  await context.close();
});
