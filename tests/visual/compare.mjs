// Shared by tests/visual/visual.spec.ts and scripts/visual-compare.mjs, so the
// test and the manual tool always measure the same thing.
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export const MAX_DIFF_PERCENT = 2;

/**
 * Loads a route the way the designs were captured: reduced motion, network
 * idle, fonts ready, and SEO-only additions ([data-seo-extra]) hidden.
 * @param {import("@playwright/test").Page} page
 * @param {string} url
 * @param {{ hideExtras?: boolean }} [options]
 */
export async function preparePage(page, url, { hideExtras = true } = {}) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (hideExtras) await page.addStyleTag({ content: "[data-seo-extra]{display:none!important}" });
  await page.waitForTimeout(200);
}

/**
 * Pads an image to the target size with magenta, so height drift counts as diff.
 * @param {PNG} img
 * @param {number} width
 * @param {number} height
 */
export function padTo(img, width, height) {
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

/**
 * Compares a screenshot with a design PNG.
 * @param {Buffer} actualPng
 * @param {Buffer} designPng
 */
export function compare(actualPng, designPng) {
  const actual = PNG.sync.read(actualPng);
  const expected = PNG.sync.read(designPng);
  const width = expected.width;
  const height = Math.max(actual.height, expected.height);
  const a = padTo(actual, width, height);
  const e = padTo(expected, width, height);
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(a.data, e.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });
  return {
    diffPixels,
    percent: Number(((100 * diffPixels) / (width * height)).toFixed(2)),
    actualHeight: actual.height,
    designHeight: expected.height,
    diffPng: PNG.sync.write(diff),
  };
}
