export interface TocEntry {
  depth: 2 | 3;
  text: string;
  id: string;
}

/** URL-safe heading id, stable between the table of contents and the article. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_[\]()'’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** h2 and h3 headings from Markdown, skipping fenced code blocks. */
export function extractToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^(##|###)\s+(.+?)\s*$/);
    if (m) entries.push({ depth: m[1].length as 2 | 3, text: m[2], id: slugify(m[2]) });
  }
  return entries;
}

export function wordCount(markdown: string) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*|`-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

/** Minutes at about 220 words per minute, at least one. */
export function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(wordCount(markdown) / 220));
}
