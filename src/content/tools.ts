/**
 * The tools we build with. One source of truth for the home trust strip, the
 * "Tools we build with" groups (home and About), the service "Connects with"
 * chips, the FAQ answer, Organization and Person JSON-LD (knowsAbout) and llms.txt.
 */
export const TOOLS = [
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
] as const;

export type Tool = (typeof TOOLS)[number];

/**
 * The main tools for the home trust strip. All 13 do not fit one row at 1440px,
 * so the strip shows these 8 (in list order) and the Tools section shows the rest.
 */
export const TRUST_STRIP_TOOLS: Tool[] = [
  "n8n",
  "Make.com",
  "Zapier",
  "Airtable",
  "OpenAI",
  "WhatsApp",
  "Next.js",
  "React",
];

/** "Tools we build with" groups. WhatsApp is named by its API here. */
export const TOOL_GROUPS: { title: string; tools: string[] }[] = [
  {
    title: "AI and automation",
    tools: ["n8n", "Make.com", "Zapier", "Airtable", "OpenAI", "WhatsApp Cloud API"],
  },
  { title: "Frontend", tools: ["Next.js", "React", "Vue.js"] },
  { title: "Backend", tools: ["Ruby on Rails", "Supabase", "Google Sheets", "Slack"] },
];

/** "a, b and c" */
export function listSentence(items: readonly string[]): string {
  return items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** All tools as one sentence fragment: "n8n, Make.com, … Ruby on Rails and Supabase". */
export const TOOLS_SENTENCE = listSentence(TOOLS);
