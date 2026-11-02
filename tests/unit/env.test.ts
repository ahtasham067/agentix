import { afterEach, describe, expect, it, vi } from "vitest";
import { assertEmailConfigured, emailConfigured, getEmailEnv } from "@/lib/env";

const SMTP_KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "EMAIL_FROM"];

function setEmailEnv(values: Record<string, string>) {
  for (const key of SMTP_KEYS) vi.stubEnv(key, values[key] ?? "");
}

describe("email settings", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("refuses to start in production without SMTP settings", () => {
    setEmailEnv({});
    expect(() => assertEmailConfigured("production")).toThrow(/Quote emails are required/);
  });

  it("starts in production when SMTP and the sender are set", () => {
    setEmailEnv({ SMTP_HOST: "smtp.resend.com", EMAIL_FROM: "Agentix <quotes@agentix.website>" });
    expect(() => assertEmailConfigured("production")).not.toThrow();
  });

  it("requires a password when a user is set", () => {
    setEmailEnv({ SMTP_HOST: "smtp.example.com", EMAIL_FROM: "a@b.co", SMTP_USER: "resend" });
    expect(emailConfigured()).toBe(false);
  });

  it("does not require email outside production", () => {
    setEmailEnv({});
    expect(() => assertEmailConfigured("development")).not.toThrow();
  });

  it("parses port and TLS flags", () => {
    setEmailEnv({ SMTP_HOST: "h", EMAIL_FROM: "a@b.co", SMTP_PORT: "465", SMTP_SECURE: "true" });
    expect(getEmailEnv()).toMatchObject({ SMTP_PORT: 465, SMTP_SECURE: true });
  });
});
