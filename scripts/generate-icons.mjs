// Renders the logo mark to PNG icons (favicon fallbacks, manifest, JSON-LD logo).
// Usage: node scripts/generate-icons.mjs
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const svg = readFileSync("src/app/icon.svg", "utf8");
const targets = [
  { file: "public/agentix-icon-192.png", size: 192, pad: 0, radius: true },
  { file: "public/agentix-icon-512.png", size: 512, pad: 0, radius: true },
  { file: "public/agentix-logo-512.png", size: 512, pad: 0, radius: true },
  { file: "public/agentix-icon-maskable-512.png", size: 512, pad: 0, radius: false },
  { file: "src/app/apple-icon.png", size: 180, pad: 0, radius: false },
];

const browser = await chromium.launch();
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.size, height: t.size } });
  // Apple applies its own corner mask, so the apple icon is a full square.
  const markup = t.radius ? svg : svg.replace('rx="8"', 'rx="0"');
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${markup.replace("<svg ", `<svg width="${t.size}" height="${t.size}" `)}</body></html>`,
  );
  await page.screenshot({ path: t.file, omitBackground: true });
  await page.close();
  console.log("wrote", t.file);
}
await browser.close();
