// Runs Lighthouse (mobile) against a production server and fails below thresholds.
// Usage: npm run test:lighthouse   (expects `npm run build` first)
import { spawn } from "node:child_process";
import fs from "node:fs";
import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { TEST_MAIL_ENV } from "./test-mail-env.mjs";

const PORT = Number(process.env.LH_PORT ?? 3000);
const BASE = process.env.LH_BASE_URL ?? `http://localhost:${PORT}`;
const PAGES = process.env.LH_PAGES
  ? process.env.LH_PAGES.split(",")
  : [
      "/",
      "/products",
      "/services",
      "/services/chatbots-ai-agents",
      "/services/web-development",
      "/products/clinidesk",
      "/contact",
    ];
const THRESHOLDS = {
  performance: Number(process.env.LH_MIN_PERFORMANCE ?? 0.9),
  accessibility: Number(process.env.LH_MIN_ACCESSIBILITY ?? 0.95),
  "best-practices": Number(process.env.LH_MIN_BEST_PRACTICES ?? 0.9),
  seo: Number(process.env.LH_MIN_SEO ?? 1),
};
const OUT = "test-results/lighthouse";
// Lighthouse scores vary between runs; use the median of several (Lighthouse's own advice).
const RUNS = Number(process.env.LH_RUNS ?? 5);

// Lighthouse slows the CPU 4x by default, which is calibrated for a high-end
// desktop. Its throttling docs (docs/throttling.md, "Calibrating multipliers")
// ask you to calibrate on other hosts: to emulate a mid-tier phone, use 4x on a
// high-end desktop (benchmarkIndex 1500+), 2x on a low-end desktop (1000-1500)
// or high-end mobile (800-1200), and 1x below that. LH_CPU_MULTIPLIER overrides it.
function cpuMultiplier(benchmarkIndex) {
  if (process.env.LH_CPU_MULTIPLIER) return Number(process.env.LH_CPU_MULTIPLIER);
  if (benchmarkIndex >= 1500) return 4;
  if (benchmarkIndex >= 800) return 2;
  return 1;
}

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
    // Mail goes to the local Mailpit, never to a real inbox.
    env: { ...process.env, ...TEST_MAIL_ENV },
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

/** One performance-only run, used to warm a route and to read the host CPU benchmark. */
async function warmUpRun(url) {
  const { lhr } = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance"],
  });
  return lhr;
}

try {
  // Calibrate the CPU slowdown once per run, from the median of three benchmark
  // readings. A single reading swings a lot on a busy host, and calibrating each page
  // separately mixed 2x and 4x throttling in the same run.
  await fetch(BASE + PAGES[0]);
  const readings = [];
  for (let i = 0; i < 3; i++)
    readings.push((await warmUpRun(BASE + PAGES[0])).environment.benchmarkIndex);
  readings.sort((a, b) => a - b);
  const benchmarkIndex = Math.round(readings[1]);
  const multiplier = cpuMultiplier(benchmarkIndex);
  console.log(
    `CPU benchmark ${readings.map(Math.round).join("/")} (median ${benchmarkIndex}): ${multiplier}x slowdown`,
  );

  for (const path of PAGES) {
    const url = BASE + path;
    // Warm the route so the measured run reflects a cached production response.
    await fetch(url);
    const runs = [];
    // One discarded warm-up run: the first loads after a server or browser start are slower.
    const warmUp = await warmUpRun(url);
    for (let i = 0; i < RUNS; i++) {
      const { lhr: run } = await lighthouse(
        url,
        {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: Object.keys(THRESHOLDS),
        },
        {
          extends: "lighthouse:default",
          settings: {
            throttling: {
              ...warmUp.configSettings.throttling,
              cpuSlowdownMultiplier: multiplier,
            },
          },
        },
      );
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
      cpu: `${multiplier}x (index ${benchmarkIndex})`,
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
