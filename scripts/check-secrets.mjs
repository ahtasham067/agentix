// Fails when a server secret ends up in the browser bundle (.next/static).
// Runs after `next build` in `npm run verify`.
import fs from "node:fs";
import path from "node:path";

try {
  process.loadEnvFile(".env.local");
} catch {
  // CI provides the variables directly.
}

const SECRET_VARS = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SMTP_PASS",
  "RESEND_API_KEY",
  "IP_HASH_SALT",
  "REVALIDATE_SECRET",
  "INDEXNOW_KEY",
];
// Patterns that must never appear in client files, whatever their value.
const PATTERNS = [
  { name: "JWT", re: /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ },
  { name: "Supabase secret key", re: /sb_secret_[A-Za-z0-9_-]{10,}/ },
  { name: "Resend API key", re: /\bre_[A-Za-z0-9]{8,}_[A-Za-z0-9]{8,}/ },
  { name: "service role name", re: /SUPABASE_SERVICE_ROLE_KEY|SMTP_PASS|RESEND_API_KEY/ },
];

const dir = ".next/static";
if (!fs.existsSync(dir)) throw new Error("Run `next build` first: .next/static is missing.");

function* files(d) {
  for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, entry.name);
    if (entry.isDirectory()) yield* files(p);
    else if (/\.(js|css|html|json|txt|map)$/.test(entry.name)) yield p;
  }
}

const values = SECRET_VARS.map((name) => [name, process.env[name]]).filter(
  ([, v]) => v && v.length >= 8,
);
const leaks = [];
let count = 0;
for (const file of files(dir)) {
  count++;
  const text = fs.readFileSync(file, "utf8");
  for (const [name, value] of values)
    if (text.includes(value)) leaks.push(`${file}: value of ${name}`);
  for (const { name, re } of PATTERNS) if (re.test(text)) leaks.push(`${file}: ${name}`);
}

if (leaks.length) {
  console.error(`Secrets found in the client bundle:\n- ${leaks.join("\n- ")}`);
  process.exit(1);
}
console.log(`No secrets in ${count} client files (${values.length} secret values checked).`);
