import { describe, expect, it } from "vitest";
import {
  CURRENCY,
  formatPlanPrice,
  formatPrice,
  getPricingGroup,
  pricingGroups,
  quoteHref,
} from "@/content/pricing";
import { services } from "@/content/services";
import { contact, formatPhone, telUrl, whatsappUrl } from "@/content/site";
import { SERVICE_SLUGS } from "@/content/types";
import { faq } from "@/content/faq";
import { PLAN_OPTIONS, SERVICE_OPTIONS } from "@/lib/quote-schema";
import { getStats } from "@/lib/stats";

describe("pricing config", () => {
  it("uses PKR and the owner's prices only", () => {
    expect(CURRENCY).toBe("PKR");
    const prices = Object.fromEntries(
      pricingGroups.map((g) => [g.key, g.plans.map((p) => [p.key, p.amount, p.interval ?? null])]),
    );
    expect(prices).toEqual({
      website: [
        ["one-time", 5999, null],
        ["subscription", 999, "month"],
      ],
      chatbot: [
        ["one-time", 8999, null],
        ["subscription", 1499, "month"],
      ],
    });
  });

  it("formats prices", () => {
    expect(formatPrice(5999)).toBe("Rs 5,999");
    expect(formatPlanPrice({ amount: 999, interval: "month" })).toBe("Rs 999 per month");
    expect(formatPlanPrice({ amount: 8999 })).toBe("Rs 8,999");
  });

  it("links each plan to the quote form with service and plan", () => {
    expect(quoteHref("web-development", "one-time")).toBe(
      "/contact?service=web-development&plan=one-time#quote",
    );
    expect(getPricingGroup("chatbots-ai-agents")?.key).toBe("chatbot");
    expect(getPricingGroup("web-development")?.key).toBe("website");
    expect(getPricingGroup("seo-geo")).toBeUndefined();
  });

  it("states the prices in the FAQ answers", () => {
    expect(faq.websiteCost.question).toBe("How much does a custom website cost?");
    expect(faq.websiteCost.answer).toContain("Rs 5,999");
    expect(faq.websiteCost.answer).toContain("Rs 999 per month");
    expect(faq.chatbotCost.answer).toContain("Rs 8,999");
    expect(faq.chatbotCost.answer).toContain("Rs 1,499 per month");
  });
});

describe("services", () => {
  it("has exactly the four services, in order", () => {
    expect(services.map((s) => s.slug)).toEqual([...SERVICE_SLUGS]);
    expect(services.map((s) => s.name)).toEqual([
      "Chatbots and AI Agents",
      "Automation",
      "Web Development",
      "SEO and GEO",
    ]);
  });

  it("uses the same names in the quote form dropdown", () => {
    expect(SERVICE_OPTIONS.map((o) => o.label)).toEqual([
      ...services.map((s) => s.name),
      "Not sure",
    ]);
    expect(PLAN_OPTIONS.map((o) => o.value)).toEqual(["one-time", "subscription", "not-sure"]);
  });

  it.each(services.map((s) => [s.slug, s] as const))(
    "%s has answer-first copy, a comparison table and an FAQ",
    (_slug, s) => {
      const words = s.answer.split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(60);
      expect(s.seo.title.length).toBeLessThanOrEqual(60);
      expect(s.seo.description.length).toBeGreaterThanOrEqual(120);
      expect(s.seo.description.length).toBeLessThanOrEqual(155);
      expect(s.comparison.rows.every((r) => r.length === s.comparison.columns.length)).toBe(true);
      expect(s.faqs.length).toBeGreaterThanOrEqual(4);
      expect(s.connects.length).toBeGreaterThanOrEqual(4);
    },
  );

  it("names n8n first for automation and lists Make.com, Zapier and Airtable", () => {
    const automation = services.find((s) => s.slug === "automation")!;
    expect(automation.connects.slice(0, 4)).toEqual(["n8n", "Make.com", "Zapier", "Airtable"]);
  });

  it("counts the services in the stats", () => {
    expect(getStats(7).find((s) => s.label === "core services")?.value).toBe("4");
  });
});

describe("contact details", () => {
  it("defaults to the owner's email and phone", () => {
    expect(contact.email).toBe("ahtashamm067@gmail.com");
    expect(contact.phone).toBe("+923025889452");
    expect(contact.phoneDisplay).toBe("+92 302 5889452");
    expect(telUrl).toBe("tel:+923025889452");
    expect(whatsappUrl).toBe("https://wa.me/923025889452");
  });

  it("formats Pakistani mobile numbers and leaves others alone", () => {
    expect(formatPhone("+923001234567")).toBe("+92 300 1234567");
    expect(formatPhone("+447700900123")).toBe("+447700900123");
  });
});
