// Writes Supabase connection values from the local stack into .env.local.
// Keeps every other variable already in the file. Usage: npm run db:env
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const status = execFileSync("supabase", ["status", "-o", "env"], { encoding: "utf8" });
const local = Object.fromEntries(
  status
    .split("\n")
    .map((line) => line.match(/^([A-Z_]+)="?(.*?)"?$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);

const file = ".env.local";
const current = existsSync(file)
  ? Object.fromEntries(
      readFileSync(file, "utf8")
        .split("\n")
        .map((line) => line.match(/^([A-Z0-9_]+)=(.*)$/))
        .filter(Boolean)
        .map((m) => [m[1], m[2]]),
    )
  : {};

const next = {
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  IP_HASH_SALT: randomBytes(24).toString("hex"),
  ...current,
  SUPABASE_URL: local.API_URL,
  SUPABASE_ANON_KEY: local.ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: local.SERVICE_ROLE_KEY,
};

writeFileSync(
  file,
  Object.entries(next)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n") + "\n",
);
console.log(`Wrote ${Object.keys(next).length} variables to ${file}`);
