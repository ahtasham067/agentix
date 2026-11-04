import { expect, test, type Page } from "@playwright/test";
import { TOOL_GROUPS, TOOLS, TOOLS_SENTENCE, TRUST_STRIP_TOOLS } from "../../src/content/tools";

const chips = (page: Page, label: string) =>
  page.getByRole("list", { name: label, exact: true }).getByRole("listitem").allTextContents();

test("home trust strip shows the main tools in one row on desktop", async ({ page, isMobile }) => {
  await page.goto("/");
  expect(await chips(page, "Tools we use")).toEqual(TRUST_STRIP_TOOLS);
  if (!isMobile) {
    const tops = await page
      .getByRole("list", { name: "Tools we use" })
      .getByRole("listitem")
      .evaluateAll(
        (els) => new Set(els.map((e) => Math.round(e.getBoundingClientRect().top))).size,
      );
    expect(tops, "one row").toBe(1);
  }
});

for (const path of ["/", "/about"]) {
  test(`${path} tools section shows the three tool groups`, async ({ page }) => {
    await page.goto(path);
    for (const group of TOOL_GROUPS) {
      expect(await chips(page, `${group.title} tools`)).toEqual(group.tools);
    }
  });
}

test("build service pages list every tool under Connects with", async ({ page }) => {
  for (const [slug, name] of [
    ["chatbots-ai-agents", "chatbots and ai agents"],
    ["automation", "automation"],
    ["web-development", "web development"],
  ]) {
    await page.goto(`/services/${slug}`);
    expect(await chips(page, `Tools for ${name}`)).toEqual([...TOOLS]);
  }
});

test("the FAQ answer lists every tool", async ({ page }) => {
  await page.goto("/");
  const item = page.locator("details", { hasText: "Which tools can you connect?" }).first();
  await item.locator("summary").click();
  await expect(item).toContainText(TOOLS_SENTENCE);
});
