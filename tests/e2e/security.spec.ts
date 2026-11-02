import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import { adminClient, randomIp, staticRoutes } from "./helpers";
import { countMail } from "./mailpit";

async function fill(page: Page, email: string, details: string) {
  await page.getByLabel("Full name").fill("Security Tester");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Service", { exact: true }).selectOption("automation");
  await page.getByLabel("Plan", { exact: true }).selectOption("not-sure");
  await page.getByLabel("Budget range").selectOption("not-sure");
  await page.getByLabel("Project details").fill(details);
}

async function rows(email: string) {
  const { data, error } = await adminClient().from("quotes").select("id").eq("email", email);
  if (error) throw error;
  return data;
}

const stamp = (p: string, project: string) =>
  `${p}${project}${Date.now()}${Math.floor(Math.random() * 1e6)}`;

test("a spoofed x-forwarded-for does not get around the rate limit", async ({ page }, testInfo) => {
  const realIp = randomIp();
  const tag = stamp("spoof", testInfo.project.name);
  for (let i = 0; i < 4; i++) {
    await page.setExtraHTTPHeaders({ "x-real-ip": realIp, "x-forwarded-for": randomIp() });
    await page.goto("/contact");
    await fill(page, `${tag}-${i}@example.com`, `Automate our weekly sales report ${tag}.`);
    await page.getByRole("button", { name: "Send request" }).click();
    if (i < 3) await expect(page.getByTestId("quote-success")).toBeVisible();
  }
  await expect(page.locator("form [role=alert]")).toContainText("several requests in a short time");
  expect(await rows(`${tag}-3@example.com`)).toHaveLength(0);
});

/** Posts the quote form like a browser without JavaScript would, with a chosen Origin. */
async function rawPost(request: APIRequestContext, origin: string, tag: string) {
  const html = await (await request.get("/contact")).text();
  const form = html.match(/<form[^>]*id="quote"[\s\S]*?<\/form>/)![0];
  const decode = (v: string) => v.replaceAll("&quot;", '"').replaceAll("&amp;", "&");
  const multipart: Record<string, string> = {};
  for (const m of form.matchAll(/<input type="hidden" name="([^"]+)"(?: value="([^"]*)")?/g)) {
    multipart[decode(m[1])] = decode(m[2] ?? "");
  }
  Object.assign(multipart, {
    fullName: "Raw Poster",
    email: `${tag}@example.com`,
    whatsapp: "",
    service: "automation",
    plan: "not-sure",
    budget: "not-sure",
    details: `A form post sent straight to the server ${tag}.`,
    company: "",
  });
  return request.post("/contact", {
    multipart,
    headers: { origin, "x-real-ip": randomIp() },
    maxRedirects: 0,
  });
}

test("a cross-site form post is rejected (CSRF)", async ({ request }, testInfo) => {
  const evil = stamp("csrf", testInfo.project.name);
  const res = await rawPost(request, "https://evil.example", evil);
  expect(res.status()).toBeGreaterThanOrEqual(400);
  expect(await rows(`${evil}@example.com`)).toHaveLength(0);
  expect(await countMail(evil)).toBe(0);

  // Control: the same post from our own origin is accepted.
  const same = stamp("same", testInfo.project.name);
  const ok = await rawPost(request, new URL(testInfo.project.use.baseURL!).origin, same);
  expect(ok.status()).toBe(200);
  expect(await rows(`${same}@example.com`)).toHaveLength(1);
});

test("an oversized form body is refused before it is processed", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    extraHTTPHeaders: { "x-real-ip": randomIp() },
  });
  const page = await context.newPage();
  const tag = stamp("big", testInfo.project.name);
  await page.goto("/contact");
  await fill(page, `${tag}@example.com`, "placeholder text that is long enough");
  await page.locator('textarea[name="details"]').evaluate((el: HTMLTextAreaElement, t: string) => {
    el.removeAttribute("maxlength");
    el.value = `${t} ${"x".repeat(80_000)}`;
  }, tag);
  const [response] = await Promise.all([
    page.waitForResponse((r) => r.request().method() === "POST"),
    page.getByRole("button", { name: "Send request" }).click(),
  ]);
  expect(response.status()).toBeGreaterThanOrEqual(400);
  expect(await rows(`${tag}@example.com`)).toHaveLength(0);
  await context.close();
});

test("every link that opens a new tab uses noopener noreferrer", async ({ page }) => {
  const routes = [...staticRoutes, "/products/clinidesk", "/products/autobuffy"];
  for (const route of routes) {
    await page.goto(route);
    const bad = await page
      .locator('a[target="_blank"]')
      .evaluateAll((els) =>
        els
          .filter(
            (a) =>
              !/\bnoopener\b/.test(a.getAttribute("rel") ?? "") ||
              !/\bnoreferrer\b/.test(a.getAttribute("rel") ?? ""),
          )
          .map((a) => a.getAttribute("href")),
      );
    expect(bad, route).toEqual([]);
  }
});

test("the revalidation webhook needs the secret", async ({ request }) => {
  expect((await request.post("/api/revalidate", { data: { tag: "posts" } })).status()).toBe(401);
  const wrong = await request.post("/api/revalidate", {
    data: { tag: "posts" },
    headers: { "x-revalidate-secret": "wrong-secret-wrong-secret" },
  });
  expect(wrong.status()).toBe(401);
});

test("cross-origin resource policy is set", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["cross-origin-resource-policy"]).toBe("same-origin");
  expect(res.headers()["cross-origin-opener-policy"]).toBe("same-origin");
});
