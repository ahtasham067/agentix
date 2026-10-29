import "server-only";
import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Client IP from proxy headers. On Vercel the first x-forwarded-for entry is
 * set by the platform. Self-hosted deployments must strip client-sent values.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

/** Salted SHA-256, so raw IP addresses are never stored. */
export function hashIp(ip: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/** True when this IP hash already sent `max` quotes inside the window. */
export async function isRateLimited(
  supabase: SupabaseClient<Database>,
  ipHash: string,
  max: number,
  windowMinutes: number,
): Promise<boolean> {
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { count, error } = await supabase
    .from("quotes")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (error) throw new Error(`Rate limit check failed: ${error.message}`);
  return (count ?? 0) >= max;
}
