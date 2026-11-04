import { expect, test, type Page } from "@playwright/test";
import { adminClient, randomIp } from "./helpers";
import { countMail, waitForMail } from "./mailpit";

const OWNER = "ahtasham067@gmail.com";

function token(prefix: string, project: string) {
  return `${prefix}${project}${Date.now()}${Math.floor(Math.random() * 1e6)}`;
}

async function fill(page: Page, { email, details }: { email: string; details: string }) {
  await page.getByLabel("Full name").fill("Mail Tester");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("WhatsApp number").fill("+92 302 5889452");
  await page.getByLabel("Service", { exact: true }).selectOption("web-development");
  await page.getByLabel("Plan", { exact: true }).selectOption("subscription");
  await page.getByLabel("Budget range").selectOption("250k-1m");
  await page.getByLabel("Project details").fill(details);
}

async function quoteRow(email: string) {
  const { data, error } = await adminClient().from("quotes").select("*").eq("email", email);
  if (error) throw error;
  return data;
}

test("a quote sends the owner an email with the right, escaped content", async ({
  page,
}, testInfo) => {
  await page.setExtraHTTPHeaders({ "x-real-ip": randomIp() });
  const tag = token("mailtoken", testInfo.project.name);
  const email = `${tag}@example.com`;
  const details = `Please build our site. ${tag} <script>alert("x")</script> & thanks`;

  await page.goto("/contact");
  await fill(page, { email, details });
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByTestId("quote-success")).toContainText("Thanks, Mail.");

  const [owner] = await waitForMail(`to:${OWNER} ${tag}`);
  expect(owner.From.Address).toBe("quotes@agentix.website");
  expect(owner.To.map((t) => t.Address)).toEqual([OWNER]);
  expect(owner.ReplyTo.map((r) => r.Address)).toEqual([email]);
  expect(owner.Subject).toBe("New quote: Web Development, Subscription plan – Mail Tester");
  for (const line of [
    "Name: Mail Tester",
    `Email: ${email}`,
    "WhatsApp: +92 302 5889452",
    "Service: Web Development",
    "Plan: Subscription plan",
    "Budget: Rs 250k – 1M",
  ]) {
    expect(owner.Text).toContain(line);
  }
  expect(owner.Text).toContain(details);
  expect(owner.HTML).not.toContain("<script>");
  expect(owner.HTML).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; thanks");

  const [confirmation] = await waitForMail(`to:${email} subject:"We received your request"`);
  expect(confirmation.ReplyTo.map((r) => r.Address)).toEqual([OWNER]);
  expect(confirmation.Text).toContain("Hi Mail,");
  expect(confirmation.Text).not.toContain(tag);

  const [row] = await quoteRow(email);
  expect(row).toMatchObject({ service: "web-development", plan: "subscription" });
  expect(row.notified_at).not.toBeNull();
  expect(row.notified).toBe(true);
});

test("the form works without JavaScript and still sends the email", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    extraHTTPHeaders: { "x-real-ip": randomIp() },
  });
  const page = await context.newPage();
  const tag = token("nojs", testInfo.project.name);
  const email = `${tag}@example.com`;

  await page.goto("/contact");
  await fill(page, { email, details: `No JavaScript here, only HTML. ${tag}` });
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByTestId("quote-success")).toContainText("Thanks, Mail.");

  const [owner] = await waitForMail(`to:${OWNER} ${tag}`);
  expect(owner.Subject).toContain("Web Development");
  expect(await quoteRow(email)).toHaveLength(1);
  await context.close();
});

test("a no-JavaScript submit with errors shows them and keeps the values", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("A");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByText("Please choose a plan.")).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("A");
  await context.close();
});

test("honeypot submissions send no email", async ({ page }, testInfo) => {
  await page.setExtraHTTPHeaders({ "x-real-ip": randomIp() });
  const tag = token("honeypot", testInfo.project.name);
  await page.goto("/contact");
  await fill(page, { email: `${tag}@example.com`, details: `Bot text that should vanish. ${tag}` });
  await page.locator('input[name="company"]').evaluate((el: HTMLInputElement) => {
    el.value = "Spam Corp";
  });
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByTestId("quote-success")).toBeVisible();
  expect(await countMail(tag)).toBe(0);
});
