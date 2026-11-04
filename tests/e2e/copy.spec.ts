import { expect, test } from "@playwright/test";

test("home hero names every service, including web apps", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByText(
      "We build custom AI agents, chatbots, automation workflows and web apps for support, sales and operations.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Your repetitive work, handled by AI agents.",
  );
});
