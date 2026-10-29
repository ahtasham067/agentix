// usage: node shot.mjs <route> <design.png> <outPrefix> [hideExtras=1]
import { chromium } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
const [route, design, out, hide = "1"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const logs = [];
page.on("console", (m) => {
  if (m.type() === "error") logs.push(m.text());
});
await page.goto(base + route, { waitUntil: "load", timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
if (hide === "1") await page.addStyleTag({ content: "[data-seo-extra]{display:none!important}" });
await page.waitForTimeout(300);
const buf = await page.screenshot({ fullPage: true, animations: "disabled" });
await browser.close();
fs.writeFileSync(out + "-actual.png", buf);
const a = PNG.sync.read(buf);
const d = PNG.sync.read(fs.readFileSync(design));
const w = d.width,
  h = Math.max(a.height, d.height);
const pad = (img) => {
  const p = new PNG({ width: w, height: h });
  p.data.fill(0);
  for (let i = 3; i < p.data.length; i += 4) p.data[i] = 255;
  PNG.bitblt(img, p, 0, 0, Math.min(img.width, w), img.height, 0, 0);
  return p;
};
const A = pad(a),
  D = pad(d),
  diff = new PNG({ width: w, height: h });
const n = pixelmatch(A.data, D.data, diff.data, w, h, { threshold: 0.1, includeAA: false });
fs.writeFileSync(out + "-diff.png", PNG.sync.write(diff));
console.log(
  JSON.stringify({
    route,
    actualHeight: a.height,
    designHeight: d.height,
    diffPixels: n,
    percent: +((100 * n) / (w * h)).toFixed(2),
    consoleErrors: logs.slice(0, 5),
  }),
);
