import "server-only";
import { createHash } from "node:crypto";

/**
 * Client IP from the one header the hosting platform controls. Vercel sets
 * `x-real-ip` itself, so a visitor cannot spoof it. Client-sent headers such as
 * the first `x-forwarded-for` hop are never trusted. Behind another proxy, set
 * TRUSTED_IP_HEADER to the header it overwrites; for `x-forwarded-for` the
 * last hop (added by that proxy) is used.
 */
export function clientIp(headers: Headers, trustedHeader = "x-real-ip"): string {
  const name = trustedHeader.toLowerCase();
  const raw = headers.get(name);
  if (!raw) return "unknown";
  const hops = raw
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  const ip = name === "x-forwarded-for" ? hops.at(-1) : hops[0];
  return ip && /^[0-9a-fA-F.:]{3,45}$/.test(ip) ? ip : "unknown";
}

/** Salted SHA-256, so raw IP addresses are never stored. */
export function hashIp(ip: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
