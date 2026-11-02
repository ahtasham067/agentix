import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

export const staticRoutes = [
  "/",
  "/products",
  "/services",
  "/services/chatbots-ai-agents",
  "/services/automation",
  "/services/web-development",
  "/services/seo-geo",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
];

export function adminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Collects console errors and uncaught exceptions for the page's lifetime. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

export async function seriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  return results.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`);
}

export function randomIp() {
  const b = () => Math.floor(Math.random() * 254) + 1;
  return `10.${b()}.${b()}.${b()}`;
}
