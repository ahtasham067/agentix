// Submits every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver and others).
// Usage: INDEXNOW_KEY=... NEXT_PUBLIC_SITE_URL=https://agentix.website node scripts/indexnow.mjs [path ...]
// With paths, only those are submitted (for example: /services/seo-geo /llms.txt).
try {
  process.loadEnvFile(".env.local");
} catch {
  // CI or the shell provides the variables.
}

const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
const key = process.env.INDEXNOW_KEY || "";
if (!site.startsWith("https://"))
  throw new Error("Set NEXT_PUBLIC_SITE_URL to the live https:// origin.");
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key))
  throw new Error("Set INDEXNOW_KEY (8-128 letters, digits or dashes).");

const keyLocation = `${site}/indexnow-key.txt`;
const served = await (await fetch(keyLocation)).text();
if (served.trim() !== key)
  throw new Error(`${keyLocation} does not serve the key yet. Deploy first.`);

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => `${site}${p.startsWith("/") ? p : `/${p}`}`)
  : [...(await (await fetch(`${site}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1],
    );

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok && res.status !== 202) process.exit(1);
