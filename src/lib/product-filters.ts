import type { Project } from "@/content/types";

// Kept free of zod so client components can import it cheaply.

export const PRODUCT_FILTERS = [
  { key: "all", label: "All" },
  { key: "ai-agents", label: "AI Agents" },
  { key: "web-apps", label: "Web Apps" },
  { key: "automation", label: "Automation" },
] as const;

export type ProductFilter = (typeof PRODUCT_FILTERS)[number]["key"];

/** Automation also covers products that run on n8n workflows. */
export function matchesFilter(product: Pick<Project, "category" | "tags">, filter: ProductFilter) {
  if (filter === "all") return true;
  if (filter === "automation") {
    return product.category === "automation" || product.tags.some((t) => t.toLowerCase() === "n8n");
  }
  return product.category === filter;
}
