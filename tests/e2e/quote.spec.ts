import { expect, test, type Page } from "@playwright/test";
import { adminClient, randomIp } from "./helpers";

async function fillForm(page: Page, email: string) {
  await page.getByLabel("Full name").fill("Playwright Tester");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("WhatsApp number").fill("+92 300 1234567");
  await page.getByLabel("Service").selectOption("n8n-automation");
  await page.getByLabel("Budget range").selectOption("250k-1m");
  await page
    .getByLabel("Project details")
    .fill("Automate our weekly sales report from Google Sheets to Slack.");
}

async function quotesFor(email: string) {
  const { data, error } = await adminClient().from("quotes").select("*").eq("email", email);
  if (error) throw error;
  return data;
}

test("shows validation errors for an empty or invalid form", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByText("Please enter your email address.")).toBeVisible();
  await expect(page.getByText("Please choose a service.")).toBeVisible();
  await expect(page.getByText("Please select a budget range.")).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeFocused();

  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Email").blur();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
});

test("submits a valid quote and stores it", async ({ page }, testInfo) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
  const email = `e2e-${testInfo.project.name}-${Date.now()}@example.com`;
  await page.goto("/contact");
  await fillForm(page, email);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByTestId("quote-success")).toContainText("Thanks, Playwright.");

  const rows = await quotesFor(email);
  expect(rows).toHaveLength(1);
  expect(rows[0]).toMatchObject({
    full_name: "Playwright Tester",
    service: "n8n-automation",
    budget: "250k-1m",
    whatsapp: "+92 300 1234567",
  });
  expect(rows[0].ip_hash).toMatch(/^[0-9a-f]{64}$/);
});

test("the honeypot silently drops bot submissions", async ({ page }, testInfo) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
  const email = `bot-${testInfo.project.name}-${Date.now()}@example.com`;
  await page.goto("/contact");
  await fillForm(page, email);
  await page.locator('input[name="company"]').evaluate((el: HTMLInputElement) => {
    el.value = "Spam Corp";
  });
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByTestId("quote-success")).toBeVisible();
  expect(await quotesFor(email)).toHaveLength(0);
});

test("rate limits repeated submissions from one IP", async ({ page }, testInfo) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": randomIp() });
  const stamp = `${testInfo.project.name}-${Date.now()}`;
  for (let i = 0; i < 3; i++) {
    await page.goto("/contact");
    await fillForm(page, `limit-${i}-${stamp}@example.com`);
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByTestId("quote-success")).toBeVisible();
  }
  await page.goto("/contact");
  const blocked = `limit-3-${stamp}@example.com`;
  await fillForm(page, blocked);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("form [role=alert]")).toContainText("several requests in a short time");
  expect(await quotesFor(blocked)).toHaveLength(0);
});
