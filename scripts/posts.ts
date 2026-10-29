import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

export interface PostSource {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  relatedServices: string[];
  body: string;
}

const POSTS_DIR = resolve(import.meta.dirname, "../src/content/posts");

/** Reads the Markdown drafts in src/content/posts (simple `key: value` front matter). */
export function loadPosts(): PostSource[] {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), "utf8");
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) throw new Error(`${file} has no front matter`);
      const meta = Object.fromEntries(
        match[1].split("\n").map((line) => {
          const i = line.indexOf(":");
          const value = line
            .slice(i + 1)
            .trim()
            .replace(/^"(.*)"$/, "$1");
          return [line.slice(0, i).trim(), value];
        }),
      );
      return {
        slug: file.replace(/\.md$/, ""),
        title: meta.title,
        seoTitle: meta.seoTitle,
        description: meta.description,
        relatedServices: (meta.relatedServices ?? "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        body: match[2].trim() + "\n",
      };
    });
}
