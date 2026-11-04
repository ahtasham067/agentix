import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildSeedSql } from "./seed-sql";

for (const [file, production] of [
  ["../supabase/seed.sql", false],
  ["../supabase/seed.production.sql", true],
] as const) {
  const target = resolve(import.meta.dirname, file);
  writeFileSync(target, buildSeedSql({ production }));
  console.log(`Wrote ${target}`);
}
