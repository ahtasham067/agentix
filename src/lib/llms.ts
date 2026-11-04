import "server-only";
import { formatPlanPrice, PRICING_DISCLAIMER, pricingGroups } from "@/content/pricing";
import { pageSeo } from "@/content/seo";
import { services } from "@/content/services";
import { contact, EXPERIENCE, founder, sameAs, SITE_DESCRIPTION, SITE_NAME } from "@/content/site";
import { TOOLS_SENTENCE } from "@/content/tools";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo/schema";

/**
 * llms.txt (https://llmstxt.org): a plain Markdown summary of the site for AI
 * tools, generated from the same content as the pages, so facts never drift.
 */

const link = (title: string, path: string, note?: string) =>
  `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

async function sources() {
  const products = await getPublishedProducts();
  return { products: products.filter((p) => p.indexable) };
}

function header(): string[] {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} is a software house founded by ${founder.name}, a full-stack developer with ${EXPERIENCE.years} years of experience and ${EXPERIENCE.projects} projects delivered. It offers four services: ${services.map((s) => s.name).join(", ")}.`,
    "",
    `Tools we build with: ${TOOLS_SENTENCE}.`,
    "",
    `Contact: email ${contact.email}, phone and WhatsApp ${contact.phoneDisplay}. Location: ${contact.location}. Quote form: ${absoluteUrl("/contact")}`,
    "",
  ];
}

function pricing(): string[] {
  return [
    "## Pricing (PKR)",
    "",
    ...pricingGroups.map(
      (g) =>
        `- ${g.title}: one-time plan ${formatPlanPrice(g.plans[0])}; subscription plan ${formatPlanPrice(g.plans[1])}. Get a quote: ${absoluteUrl(`/contact?service=${g.service}`)}`,
    ),
    `- ${PRICING_DISCLAIMER}`,
    "- Automation and SEO and GEO work are quoted on their scope.",
    "",
  ];
}

/** Short version: every public page with a one-line note. */
export async function buildLlmsTxt(): Promise<string> {
  const { products } = await sources();
  return [
    ...header(),
    "## Services",
    "",
    link("All services", "/services", pageSeo.services.description),
    ...services.map((s) => link(s.name, `/services/${s.slug}`, s.seo.description)),
    "",
    ...pricing(),
    "## Projects",
    "",
    link("All products and projects", "/products", pageSeo.products.description),
    ...products.map((p) =>
      link(p.name, `/products/${p.slug}`, p.role ? `${p.summary} Role: ${p.role}.` : p.summary),
    ),
    "",
    "## Company",
    "",
    link("Home", "/", pageSeo.home.description),
    link("About", "/about", pageSeo.about.description),
    link("Get a quote", "/contact", pageSeo.contact.description),
    "",
    "## Optional",
    "",
    link(
      "Full text for AI tools",
      "/llms-full.txt",
      "answers, FAQs and project details in one file",
    ),
    link("Privacy policy", "/privacy"),
    link("Terms of use", "/terms"),
    ...(sameAs.length ? sameAs.map((url) => `- [Profile](${url})`) : []),
    "",
  ].join("\n");
}

/** Full version: adds each page's direct answer, comparison tables and FAQs. */
export async function buildLlmsFullTxt(): Promise<string> {
  const { products } = await sources();
  const out = [...header(), ...pricing()];

  for (const s of services) {
    out.push(`## ${s.name}`, "", `URL: ${absoluteUrl(`/services/${s.slug}`)}`, "", s.answer, "");
    out.push(`Tools: ${s.connects.join(", ")}.`, "");
    out.push(`### ${s.comparison.heading}`, "");
    out.push(`| ${s.comparison.columns.join(" | ")} |`);
    out.push(`| ${s.comparison.columns.map(() => "---").join(" | ")} |`);
    for (const row of s.comparison.rows) out.push(`| ${row.join(" | ")} |`);
    out.push("", "### Questions", "");
    for (const f of s.faqs) out.push(`**${f.question}**`, "", f.answer, "");
  }

  out.push("## Projects", "");
  for (const p of products) {
    out.push(
      `### ${p.name}`,
      "",
      `URL: ${absoluteUrl(`/products/${p.slug}`)}`,
      "",
      p.answer || p.description,
      "",
    );
    const facts = [...(p.role ? [{ label: "Role", value: p.role }] : []), ...p.facts];
    if (facts.length) out.push(...facts.map((f) => `- ${f.label}: ${f.value}`), "");
    for (const f of p.faqs) out.push(`**${f.question}**`, "", f.answer, "");
  }

  return out.join("\n");
}
