import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

const TAGS = new Set(["products"]);

function sameSecret(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * Refreshes cached products after the owner edits them in Supabase.
 * Call from a Supabase database webhook:
 *   POST /api/revalidate  header x-revalidate-secret: <REVALIDATE_SECRET>  body {"tag":"products"}
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!secret || secret.length < 16 || !sameSecret(given, secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { tag?: string; table?: string };
  const tag = body.tag ?? body.table ?? "products";
  if (!TAGS.has(tag)) return Response.json({ ok: false, error: "unknown tag" }, { status: 400 });
  revalidateTag(tag, "max");
  return Response.json({ ok: true, tag });
}
