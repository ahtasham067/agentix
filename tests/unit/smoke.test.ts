import { describe, expect, it } from "vitest";
import { isSmokeTest } from "@/lib/smoke";

const TOKEN = "smoke-token-0123456789";

describe("isSmokeTest", () => {
  it("accepts only the exact token", () => {
    expect(isSmokeTest(TOKEN, TOKEN)).toBe(true);
    expect(isSmokeTest(`${TOKEN}x`, TOKEN)).toBe(false);
    expect(isSmokeTest("smoke-token-012345678X", TOKEN)).toBe(false);
  });

  it("is off without a header or a long enough server token", () => {
    expect(isSmokeTest(null, TOKEN)).toBe(false);
    expect(isSmokeTest("", TOKEN)).toBe(false);
    expect(isSmokeTest(TOKEN, undefined)).toBe(false);
    expect(isSmokeTest("short", "short")).toBe(false);
  });
});
