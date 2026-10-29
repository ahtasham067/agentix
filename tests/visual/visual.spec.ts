import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

/** Approved design PNGs (1440px wide). */
const DESIGN_DIR = "images";
const OUT_DIR = "test-results/visual";
const MAX_DIFF_PERCENT = 2;

const pages = [
  { route: "/", design: "agentix-01-home.png" },
  { route: "/products", design: "agentix-02-products.png" },
  { route: "/products/clinidesk", design: "agentix-03-product-detail-clinidesk.png" },
  { route: "/services", design: "agentix-04-services.png" },
  { route: "/services/ai-agents", design: "agentix-05-service-detail-ai-agents.png" },
  { route: "/about", design: "agentix-06-about.png" },
  { route: "/contact", design: "agentix-07-contact-get-a-quote.png" },
];

/** Pads an image to the target size; padding is magenta so height drift counts as diff. */
function padTo(img: PNG, width: number, height: number) {
  if (img.width === width && img.height === height) return img;
  const out = new PNG({ width, height });
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = 255;
    out.data[i + 1] = 0;
    out.data[i + 2] = 255;
    out.data[i + 3] = 255;
  }
  PNG.bitblt(img, out, 0, 0, Math.min(img.width, width), Math.min(img.height, height), 0, 0);
  return out;
}

// Each test writes its own result; whichever worker finishes last writes the full report.
test.afterAll(() => {
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".result.json"));
  const results = files.map((f) => JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8")));
  results.sort((a, b) => a.design.localeCompare(b.design));
  fs.writeFileSync(path.join(OUT_DIR, "report.json"), JSON.stringify(results, null, 2));
});

for (const { route, design } of pages) {
  test(`${route} matches ${design}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // SEO additions are not part of the approved design; hide them for the comparison.
    await page.addStyleTag({ content: "[data-seo-extra]{display:none!important}" });
    await page.waitForTimeout(200);

    const actual = PNG.sync.read(await page.screenshot({ fullPage: true, animations: "disabled" }));
    const expected = PNG.sync.read(fs.readFileSync(path.join(DESIGN_DIR, design)));
    const width = expected.width;
    const height = Math.max(actual.height, expected.height);
    const a = padTo(actual, width, height);
    const e = padTo(expected, width, height);
    const diff = new PNG({ width, height });
    const pixels = pixelmatch(a.data, e.data, diff.data, width, height, {
      threshold: 0.1,
      includeAA: false,
    });
    const percent = Number(((100 * pixels) / (width * height)).toFixed(2));

    const name = design.replace(".png", "");
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, `${name}-actual.png`), PNG.sync.write(actual));
    fs.writeFileSync(path.join(OUT_DIR, `${name}-diff.png`), PNG.sync.write(diff));
    fs.writeFileSync(
      path.join(OUT_DIR, `${name}.result.json`),
      JSON.stringify({
        route,
        design,
        percent,
        diffPixels: pixels,
        actualHeight: actual.height,
        designHeight: expected.height,
      }),
    );
    console.log(
      `${route}: ${percent}% of pixels differ (${actual.height}px vs ${expected.height}px)`,
    );

    expect(percent, `${route} differs from ${design}`).toBeLessThan(MAX_DIFF_PERCENT);
  });
}
