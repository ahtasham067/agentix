import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildSeedSql } from "./seed-sql";

const target = resolve(import.meta.dirname, "../supabase/seed.sql");
writeFileSync(target, buildSeedSql());
console.log(`Wrote ${target}`);
