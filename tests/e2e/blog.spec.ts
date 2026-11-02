import { expect, test } from "@playwright/test";
import { adminClient, seriousA11yViolations, trackErrors } from "./helpers";

// Draft posts must stay hidden; this slug is never published by the tests.
const DRAFT = "n8n-vs-zapier-vs-make";
// Temporarily published to exercise the article template, then set back to draft.
const FIXTURE = "ai-agent-vs-chatbot";

test("draft posts return 404 and are not listed", async ({ page }) => {
  expect((await page.goto(`/blog/${DRAFT}`))?.status()).toBe(404);
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI agents and automation blog");
  await expect(page.locator(`a[href="/blog/${DRAFT}"]`)).toHaveCount(0);
});

test.describe("a published article", () => {
  test.skip(({ isMobile }) => isMobile, "publishes shared data; runs on desktop only");

  test.beforeAll(async () => {
    const { error } = await adminClient()
      .from("posts")
      .update({ published: true, published_at: new Date().toISOString() })
      .eq("slug", FIXTURE);
    if (error) throw error;
  });

  test.afterAll(async () => {
    await adminClient()
      .from("posts")
      .update({ published: false, published_at: null })
      .eq("slug", FIXTURE);
  });

  test("renders the article template", async ({ page }) => {
    const errors = trackErrors(page);
    const res = await page.goto(`/blog/${FIXTURE}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "AI agent vs chatbot: what is the difference",
    );
    const toc = page.getByRole("navigation", { name: "On this page" });
    await expect(toc).toBeVisible();
    await toc.getByRole("link", { name: "When you need an AI agent" }).click();
    await expect(page).toHaveURL(/#when-you-need-an-ai-agent$/);
    await expect(page.getByRole("heading", { name: "About the author" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "custom AI agent development" }).first(),
    ).toHaveAttribute("href", "/services/chatbots-ai-agents");
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = jsonLd.flatMap((s) => {
      const parsed = JSON.parse(s);
      return (Array.isArray(parsed) ? parsed : [parsed]).map((x) => x["@type"]);
    });
    expect(types).toEqual(expect.arrayContaining(["BlogPosting", "BreadcrumbList"]));
    expect(errors).toEqual([]);
    expect(await seriousA11yViolations(page)).toEqual([]);
  });
});
