import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assertEmailConfigured,
  emailConfigured,
  getEmailEnv,
  missingEmailSettings,
} from "@/lib/env";

const EMAIL_KEYS = [
  "EMAIL_PROVIDER",
  "RESEND_API_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "EMAIL_TO",
];

function setEmailEnv(values: Record<string, string>) {
  for (const key of EMAIL_KEYS) vi.stubEnv(key, values[key] ?? "");
}

describe("email settings", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("refuses to start in production without email settings", () => {
    setEmailEnv({});
    expect(() => assertEmailConfigured("production")).toThrow(
      /Quote emails are required in production: set EMAIL_FROM, RESEND_API_KEY/,
    );
  });

  it("starts in production when the Resend key and the sender are set", () => {
    setEmailEnv({ RESEND_API_KEY: "re_test_123", EMAIL_FROM: "Agentix <onboarding@resend.dev>" });
    expect(() => assertEmailConfigured("production")).not.toThrow();
  });

  it("starts in production when SMTP and the sender are set", () => {
    setEmailEnv({
      EMAIL_PROVIDER: "smtp",
      SMTP_HOST: "smtp.gmail.com",
      EMAIL_FROM: "Agentix <quotes@agentix.website>",
    });
    expect(() => assertEmailConfigured("production")).not.toThrow();
  });

  it("requires a password when an SMTP user is set", () => {
    setEmailEnv({
      EMAIL_PROVIDER: "smtp",
      SMTP_HOST: "smtp.example.com",
      EMAIL_FROM: "a@b.co",
      SMTP_USER: "me",
    });
    expect(emailConfigured()).toBe(false);
    expect(missingEmailSettings()).toEqual(["SMTP_PASS"]);
    expect(() => assertEmailConfigured("production")).toThrow(/set SMTP_PASS/);
  });

  it("names every missing variable for the chosen provider", () => {
    setEmailEnv({});
    expect(missingEmailSettings()).toEqual(["EMAIL_FROM", "RESEND_API_KEY"]);
    setEmailEnv({ EMAIL_PROVIDER: "smtp" });
    expect(missingEmailSettings()).toEqual(["EMAIL_FROM", "SMTP_HOST"]);
  });

  it("uses resend by default and rejects unknown providers", () => {
    setEmailEnv({});
    expect(getEmailEnv().EMAIL_PROVIDER).toBe("resend");
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
