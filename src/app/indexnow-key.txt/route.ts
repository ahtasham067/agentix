/**
 * IndexNow key file (https://www.indexnow.org). Bing, Yandex and others fetch
 * it to confirm that URL submissions from scripts/indexnow.mjs come from us.
 */
export async function GET() {
  const key = process.env.INDEXNOW_KEY ?? "";
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
