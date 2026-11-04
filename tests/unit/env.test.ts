import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assertEmailConfigured,
  emailConfigured,
  getEmailEnv,
  missingEmailSettings,
} from "@/lib/env";

const SMTP_KEYS = [
  "EMAIL_PROVIDER",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "EMAIL_TO",
];

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
    expect(missingEmailSettings()).toEqual(["SMTP_PASS"]);
    expect(() => assertEmailConfigured("production")).toThrow(/set SMTP_PASS/);
  });

  it("names every missing variable", () => {
    setEmailEnv({});
    expect(missingEmailSettings()).toEqual(["EMAIL_FROM", "SMTP_HOST"]);
  });

  it("uses smtp by default and rejects unknown providers", () => {
    setEmailEnv({});
    expect(getEmailEnv().EMAIL_PROVIDER).toBe("smtp");
    setEmailEnv({ EMAIL_PROVIDER: "carrier-pigeon" });
    expect(() => getEmailEnv()).toThrow(/EMAIL_PROVIDER/);
  });

  it("accepts only an email address as the owner inbox", () => {
    setEmailEnv({ EMAIL_TO: "owner@example.com" });
    expect(getEmailEnv().EMAIL_TO).toBe("owner@example.com");
    setEmailEnv({ EMAIL_TO: "not an email" });
    expect(() => getEmailEnv()).toThrow(/EMAIL_TO/);
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
