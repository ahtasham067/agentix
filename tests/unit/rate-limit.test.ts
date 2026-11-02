import { describe, expect, it } from "vitest";
import { clientIp, hashIp } from "@/lib/rate-limit";

describe("clientIp", () => {
  it("reads only the trusted header and ignores a spoofed x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4", "x-real-ip": "203.0.113.7" });
    expect(clientIp(h)).toBe("203.0.113.7");
  });

  it("returns unknown when the trusted header is missing", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "1.2.3.4" }))).toBe("unknown");
  });

  it("uses the last x-forwarded-for hop when that header is configured", () => {
    const h = new Headers({ "x-forwarded-for": "6.6.6.6, 203.0.113.7" });
    expect(clientIp(h, "x-forwarded-for")).toBe("203.0.113.7");
  });

  it("rejects values that are not IP addresses", () => {
    expect(clientIp(new Headers({ "x-real-ip": "<script>" }))).toBe("unknown");
  });
});

describe("hashIp", () => {
  it("is a salted SHA-256 and never the raw IP", () => {
    const a = hashIp("203.0.113.7", "salt-one-salt-one");
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(a).not.toContain("203.0.113.7");
    expect(hashIp("203.0.113.7", "salt-two-salt-two")).not.toBe(a);
  });
});
