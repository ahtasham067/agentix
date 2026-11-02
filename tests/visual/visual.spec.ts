import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { compare, MAX_DIFF_PERCENT, preparePage } from "./compare.mjs";

/** Approved design PNGs (1440px wide). */
const DESIGN_DIR = "images";
const OUT_DIR = "test-results/visual";

const pages = [
  { route: "/", design: "agentix-01-home.png" },
  { route: "/products", design: "agentix-02-products.png" },
  { route: "/products/clinidesk", design: "agentix-03-product-detail-clinidesk.png" },
  { route: "/services", design: "agentix-04-services.png" },
  { route: "/services/chatbots-ai-agents", design: "agentix-05-service-detail-ai-agents.png" },
  { route: "/about", design: "agentix-06-about.png" },
  { route: "/contact", design: "agentix-07-contact-get-a-quote.png" },
];

// Each test writes its own result; whichever worker finishes last writes the full report.
test.afterAll(() => {
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".result.json"));
  const results = files.map((f) => JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8")));
  results.sort((a, b) => a.design.localeCompare(b.design));
  fs.writeFileSync(path.join(OUT_DIR, "report.json"), JSON.stringify(results, null, 2));
});

for (const { route, design } of pages) {
  test(`${route} matches ${design}`, async ({ page }) => {
    await preparePage(page, route);
    const actual = await page.screenshot({ fullPage: true, animations: "disabled" });
    const result = compare(actual, fs.readFileSync(path.join(DESIGN_DIR, design)));

    const name = design.replace(".png", "");
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, `${name}-actual.png`), actual);
    fs.writeFileSync(path.join(OUT_DIR, `${name}-diff.png`), result.diffPng);
    const { percent, diffPixels, actualHeight, designHeight } = result;
    fs.writeFileSync(
      path.join(OUT_DIR, `${name}.result.json`),
      JSON.stringify({ route, design, percent, diffPixels, actualHeight, designHeight }),
    );
    console.log(
      `${route}: ${result.percent}% of pixels differ (${result.actualHeight}px vs ${result.designHeight}px)`,
    );

    expect(result.percent, `${route} differs from ${design}`).toBeLessThan(MAX_DIFF_PERCENT);
  });
}
