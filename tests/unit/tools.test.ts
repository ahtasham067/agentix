import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import {
  listSentence,
  TOOL_GROUPS,
  TOOLS,
  TOOLS_SENTENCE,
  TRUST_STRIP_TOOLS,
} from "@/content/tools";
import { organizationSchema } from "@/lib/seo/schema";

const EXPECTED = [
  "n8n",
  "Make.com",
  "Zapier",
  "Airtable",
  "OpenAI",
  "WhatsApp",
  "Slack",
  "Google Sheets",
  "Next.js",
  "React",
  "Vue.js",
  "Ruby on Rails",
  "Supabase",
];

describe("tools list", () => {
  it("is the agreed list, in order", () => {
    expect([...TOOLS]).toEqual(EXPECTED);
  });

  it("splits into the three agreed groups that cover every tool once", () => {
    expect(TOOL_GROUPS).toEqual([
      {
        title: "AI and automation",
        tools: ["n8n", "Make.com", "Zapier", "Airtable", "OpenAI", "WhatsApp Cloud API"],
      },
      { title: "Frontend", tools: ["Next.js", "React", "Vue.js"] },
      { title: "Backend", tools: ["Ruby on Rails", "Supabase", "Google Sheets", "Slack"] },
    ]);
    const grouped = TOOL_GROUPS.flatMap((g) => g.tools).map((t) =>
      t === "WhatsApp Cloud API" ? "WhatsApp" : t,
    );
    expect([...grouped].sort()).toEqual([...EXPECTED].sort());
  });

  it("shows the main 8 in the trust strip, in list order", () => {
    expect(TRUST_STRIP_TOOLS).toHaveLength(8);
    expect(TRUST_STRIP_TOOLS).toEqual(
      EXPECTED.filter((t) => TRUST_STRIP_TOOLS.includes(t as never)),
    );
    for (const added of ["Next.js", "React", "Make.com", "Airtable"])
      expect(TRUST_STRIP_TOOLS).toContain(added);
  });

  it("writes a readable sentence", () => {
    expect(listSentence(["a", "b", "c"])).toBe("a, b and c");
    expect(TOOLS_SENTENCE).toBe(
      "n8n, Make.com, Zapier, Airtable, OpenAI, WhatsApp, Slack, Google Sheets, Next.js, React, Vue.js, Ruby on Rails and Supabase",
    );
  });

  it("feeds the build services' Connects with chips", () => {
    for (const slug of ["chatbots-ai-agents", "automation", "web-development"]) {
      expect(services.find((s) => s.slug === slug)!.connects).toEqual(EXPECTED);
    }
  });

  it("feeds the FAQ answer and the Organization knowsAbout", () => {
    expect(faq.whichTools.answer).toContain(TOOLS_SENTENCE);
    const org = organizationSchema() as unknown as { knowsAbout: string[] };
    for (const tool of EXPECTED) expect(org.knowsAbout).toContain(tool);
  });
});
