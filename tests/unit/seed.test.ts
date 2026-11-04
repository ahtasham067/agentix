import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "../../src/content/projects";
import { buildSeedSql } from "../../scripts/seed-sql";

const read = (file: string) => readFileSync(resolve(__dirname, "../../supabase", file), "utf8");

describe("supabase/seed.sql", () => {
  it("matches the project content (run `npm run db:seed:gen` if this fails)", () => {
    expect(read("seed.sql")).toBe(buildSeedSql());
  });

  it("includes the unpublished test row for local tests", () => {
    expect(read("seed.sql")).toContain("'internal-draft'");
  });
});

describe("supabase/seed.production.sql", () => {
  const sql = read("seed.production.sql");

  it("matches the project content (run `npm run db:seed:gen` if this fails)", () => {
    expect(sql).toBe(buildSeedSql({ production: true }));
  });

  it("has every published project and no test rows", () => {
    for (const p of projects) expect(sql).toContain(`'${p.slug}'`);
    expect(sql).not.toContain("internal-draft");
    expect(projects.every((p) => p.published)).toBe(true);
  });

  it("can be loaded twice without failing", () => {
    expect(sql).toContain("on conflict (slug) do nothing");
  });
});
