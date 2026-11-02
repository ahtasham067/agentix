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
 * Page rectangles of real pictures ([data-visual-mask]). The design shows
 * drawings in those places, so both images get the same flat box there and
 * only the rest of the page is compared.
 * @param {import("@playwright/test").Page} page
 * @returns {Promise<{ x: number, y: number, width: number, height: number }[]>}
 */
export async function maskRects(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll("[data-visual-mask]")]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0)
      .map((r) => ({
        x: Math.round(r.left + window.scrollX),
        y: Math.round(r.top + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height),
      })),
  );
}

/**
 * Paints the rectangles in one flat grey.
 * @param {PNG} img
 * @param {{ x: number, y: number, width: number, height: number }[]} rects
 */
function paintMasks(img, rects) {
  for (const r of rects) {
    for (let y = Math.max(0, r.y); y < Math.min(img.height, r.y + r.height); y++) {
      for (let x = Math.max(0, r.x); x < Math.min(img.width, r.x + r.width); x++) {
        const i = (y * img.width + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = 128;
        img.data[i + 3] = 255;
      }
    }
  }
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
 * @param {{ x: number, y: number, width: number, height: number }[]} [masks]
 */
export function compare(actualPng, designPng, masks = []) {
  const actual = PNG.sync.read(actualPng);
  const expected = PNG.sync.read(designPng);
  const width = expected.width;
  const height = Math.max(actual.height, expected.height);
  const a = padTo(actual, width, height);
  const e = padTo(expected, width, height);
  paintMasks(a, masks);
  paintMasks(e, masks);
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
