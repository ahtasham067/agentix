import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildSeedSql } from "../../scripts/seed-sql";

describe("supabase/seed.sql", () => {
  it("matches the project content (run `npm run db:seed:gen` if this fails)", () => {
    const file = readFileSync(resolve(__dirname, "../../supabase/seed.sql"), "utf8");
    expect(file).toBe(buildSeedSql());
  });
});
