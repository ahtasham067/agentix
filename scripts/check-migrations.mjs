// Blocks destructive SQL in new or changed migrations unless the PR title says
// [allow-destructive]. Migrations run against production right after a merge,
// while the previous frontend may still be serving, so they must only add.
// Usage (CI): BASE_REF=origin/main PR_TITLE="..." node scripts/check-migrations.mjs
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const DESTRUCTIVE = [
  { name: "drop table", re: /\bdrop\s+table\b/i },
  { name: "drop column", re: /\bdrop\s+column\b/i },
  { name: "truncate", re: /\btruncate\b/i },
];

/** SQL without comments, so a comment that mentions "drop table" is not flagged. */
export function stripSqlComments(sql) {
  return sql.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/--[^\n]*/g, " ");
}

/** Names of the destructive statements found in one migration. */
export function destructiveStatements(sql) {
  const code = stripSqlComments(sql);
  return DESTRUCTIVE.filter((d) => d.re.test(code)).map((d) => d.name);
}

export function allowsDestructive(prTitle = "") {
  return prTitle.includes("[allow-destructive]");
}

function changedMigrations(baseRef) {
  const out = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=AMR", `${baseRef}...HEAD`, "--", "supabase/migrations"],
    { encoding: "utf8" },
  );
  return out.split("\n").filter((f) => f.endsWith(".sql"));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const baseRef = process.env.BASE_REF || "origin/main";
  const files = changedMigrations(baseRef);
  console.log(
    files.length ? `Changed migrations:\n  ${files.join("\n  ")}` : "No migration changes.",
  );
  const findings = files.flatMap((file) =>
    destructiveStatements(readFileSync(file, "utf8")).map((name) => `${file}: ${name}`),
  );
  if (findings.length === 0) {
    console.log("No destructive statements.");
  } else if (allowsDestructive(process.env.PR_TITLE)) {
    console.log(
      `Destructive statements allowed by [allow-destructive]:\n  ${findings.join("\n  ")}`,
    );
  } else {
    console.error(
      `Destructive statements found:\n  ${findings.join("\n  ")}\n` +
        "Migrations must stay backward compatible (add before remove, two-step renames).\n" +
        "If this is intended and the deployed frontend no longer uses it, add\n" +
        "[allow-destructive] to the PR title. See docs/CICD.md.",
    );
    process.exit(1);
  }
}
