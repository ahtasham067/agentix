// @vitest-environment node
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { THUMBNAILS } from "@/content/types";

const PUBLIC = join(import.meta.dirname, "../../public");
const MAX_BYTES = 300 * 1024;

const shots = projects.flatMap((p) =>
  p.screenshots.map((s) => [p.slug, s.src.split("/").pop(), s] as const),
);

describe("project pictures", () => {
  it.each(projects.filter((p) => p.published).map((p) => [p.slug, p] as const))(
    "%s has a picture or a fallback illustration",
    (_, p) => {
      const hasFallback = (THUMBNAILS as readonly string[]).includes(p.thumbnail);
      expect(p.screenshots.length > 0 || hasFallback).toBe(true);
    },
  );

  it("every project has 2 or 3 pictures", () => {
    for (const p of projects) expect(p.screenshots.length, p.slug).toBeGreaterThanOrEqual(2);
    for (const p of projects) expect(p.screenshots.length, p.slug).toBeLessThanOrEqual(3);
  });

  it.each(shots)("%s: %s is a small WebP with alt text and a caption", async (slug, _, shot) => {
    expect(shot.src).toMatch(new RegExp(`^/projects/${slug}/[a-z0-9-]+\\.webp$`));
    expect(shot.alt.trim().length).toBeGreaterThan(20);
    expect(shot.caption.trim().length).toBeGreaterThan(5);
    expect(shot.blurDataURL).toMatch(/^data:image\/webp;base64,/);

    const file = join(PUBLIC, shot.src);
    expect(existsSync(file)).toBe(true);
    expect(statSync(file).size).toBeLessThanOrEqual(MAX_BYTES);

    const meta = await sharp(file).metadata();
    expect(meta.format).toBe("webp");
    expect(meta.width).toBe(shot.width);
    expect(meta.height).toBe(shot.height);
    expect(shot.width).toBeLessThanOrEqual(1600);
  });

  it("never uses the page design PNGs as project pictures", () => {
    for (const [, , shot] of shots) expect(shot.src).not.toMatch(/agentix-\d\d-/);
  });
});
