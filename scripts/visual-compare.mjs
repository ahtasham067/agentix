// Compares one route with a design PNG, exactly like the visual test.
// Usage: node scripts/visual-compare.mjs <route> <design.png> <outPrefix> [hideExtras=1]
import { chromium } from "@playwright/test";
import fs from "node:fs";
import { compare, preparePage } from "../tests/visual/compare.mjs";

const [route, design, out, hide = "1"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const logs = [];
page.on("console", (m) => {
  if (m.type() === "error") logs.push(m.text());
});
await preparePage(page, base + route, { hideExtras: hide === "1" });
const actual = await page.screenshot({ fullPage: true, animations: "disabled" });
await browser.close();

const { diffPng, ...result } = compare(actual, fs.readFileSync(design));
fs.writeFileSync(`${out}-actual.png`, actual);
fs.writeFileSync(`${out}-diff.png`, diffPng);
console.log(JSON.stringify({ route, ...result, consoleErrors: logs.slice(0, 5) }));
