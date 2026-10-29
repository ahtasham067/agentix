// Runs Lighthouse (mobile) against a production server and fails below thresholds.
// Usage: npm run test:lighthouse   (expects `npm run build` first)
import { spawn } from "node:child_process";
import fs from "node:fs";
import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

const PORT = Number(process.env.LH_PORT ?? 3000);
const BASE = process.env.LH_BASE_URL ?? `http://localhost:${PORT}`;
const PAGES = process.env.LH_PAGES
  ? process.env.LH_PAGES.split(",")
  : ["/", "/products", "/services", "/products/clinidesk", "/contact"];
const THRESHOLDS = {
  performance: Number(process.env.LH_MIN_PERFORMANCE ?? 0.9),
  accessibility: Number(process.env.LH_MIN_ACCESSIBILITY ?? 0.95),
  "best-practices": Number(process.env.LH_MIN_BEST_PRACTICES ?? 0.9),
  seo: Number(process.env.LH_MIN_SEO ?? 1),
};
const OUT = "test-results/lighthouse";
// Lighthouse scores vary between runs; use the median of several (Lighthouse's own advice).
const RUNS = Number(process.env.LH_RUNS ?? 5);

async function waitForServer(url, ms = 120_000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start at ${url}`);
}

let server;
if (!process.env.LH_BASE_URL) {
  server = spawn("npx", ["next", "start", "--port", String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  await waitForServer(BASE);
}

const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

fs.mkdirSync(OUT, { recursive: true });
const rows = [];
let failed = false;
try {
  for (const path of PAGES) {
    const url = BASE + path;
    // Warm the route so the measured run reflects a cached production response.
    await fetch(url);
    const runs = [];
    // One discarded warm-up run: the first loads after a server or browser start are slower.
    await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance"],
    });
    for (let i = 0; i < RUNS; i++) {
      const { lhr: run } = await lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: Object.keys(THRESHOLDS),
      });
      runs.push(run);
      // Let the machine settle so one busy moment does not skew the next run.
      await new Promise((r) => setTimeout(r, 1500));
    }
    runs.sort((a, b) => a.categories.performance.score - b.categories.performance.score);
    const lhr = runs[Math.floor(runs.length / 2)];
    const scores = Object.fromEntries(
      Object.keys(THRESHOLDS).map((k) => [k, Math.round((lhr.categories[k]?.score ?? 0) * 100)]),
    );
    const failing = Object.entries(THRESHOLDS).filter(([k, min]) => scores[k] < min * 100);
    if (failing.length) failed = true;
    rows.push({
      path,
      ...scores,
      runs: runs.map((r) => Math.round(r.categories.performance.score * 100)).join("/"),
      lcp: lhr.audits["largest-contentful-paint"].displayValue,
      cls: lhr.audits["cumulative-layout-shift"].displayValue,
      tbt: lhr.audits["total-blocking-time"].displayValue,
    });
    fs.writeFileSync(
      `${OUT}/${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}.json`,
      JSON.stringify(lhr),
    );
    if (failing.length) {
      for (const [k] of failing) {
        const audits = Object.values(lhr.audits).filter(
          (a) =>
            a.score !== null &&
            a.score < 1 &&
            lhr.categories[k].auditRefs.some((r) => r.id === a.id && r.weight > 0),
        );
        console.log(
          `  ${path} ${k} below ${THRESHOLDS[k] * 100}: ${audits.map((a) => a.id).join(", ")}`,
        );
      }
    }
  }
} finally {
  await chrome.kill();
  if (server) process.kill(-server.pid);
}

console.table(rows);
fs.writeFileSync(`${OUT}/summary.json`, JSON.stringify(rows, null, 2));
if (failed) {
  console.error("Lighthouse scores are below the thresholds.");
  process.exit(1);
}
console.log("Lighthouse thresholds met.");
