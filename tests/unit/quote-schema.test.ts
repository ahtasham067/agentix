import { describe, expect, it } from "vitest";
import { validateQuote } from "@/lib/quote-schema";

const valid = {
  fullName: "  Ada Lovelace ",
  email: "ada@example.com",
  whatsapp: "+92 302 5889452",
  service: "chatbots-ai-agents",
  plan: "one-time",
  budget: "under-250k",
  details: "We need a WhatsApp booking agent for our clinic.",
};

describe("quote schema", () => {
  it("accepts a valid quote and trims text", () => {
    const result = validateQuote(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.fullName).toBe("Ada Lovelace");
  });

  it("allows an empty WhatsApp number", () => {
    expect(validateQuote({ ...valid, whatsapp: "" }).success).toBe(true);
  });

  it.each([
    ["fullName", "A", "Please enter your full name."],
    ["email", "not-an-email", "Please enter a valid email address."],
    ["email", "", "Please enter your email address."],
    ["whatsapp", "abc", "Please enter a valid phone number, for example +92 3XX XXXXXXX."],
    ["service", "", "Please choose a service."],
    ["service", "crypto", "Please choose a service."],
    ["service", "ai-agents", "Please choose a service."],
    ["plan", "", "Please choose a plan."],
    ["plan", "lifetime", "Please choose a plan."],
    ["budget", "", "Please select a budget range."],
    ["details", "Too short", "Please tell us a bit more (at least 20 characters)."],
  ])("rejects an invalid %s", (field, value, message) => {
    const result = validateQuote({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors[field as keyof typeof result.errors]).toBe(message);
  });

  it("enforces length limits", () => {
    expect(validateQuote({ ...valid, fullName: "x".repeat(101) }).success).toBe(false);
    expect(validateQuote({ ...valid, details: "x".repeat(4001) }).success).toBe(false);
    expect(validateQuote({ ...valid, email: `${"a".repeat(250)}@x.io` }).success).toBe(false);
  });

  it("does not count surrounding spaces towards the minimum", () => {
    expect(validateQuote({ ...valid, details: `   ${"x".repeat(19)}   ` }).success).toBe(false);
  });
});

describe("control characters", () => {
  it.each([
    ["fullName", "Ada\r\nBcc: victim@example.com"],
    ["fullName", "Ada\u0000Lovelace"],
    ["details", "We need a booking agent.\u0007 Please call us back soon."],
  ])("rejects %s with control characters", (field, value) => {
    const result = validateQuote({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors[field as keyof typeof result.errors]).toBe(
        "Please remove special characters.",
      );
    }
  });

  it("allows line breaks and tabs in the project details", () => {
    expect(
      validateQuote({ ...valid, details: "Line one\r\nLine two\tTabbed text here." }).success,
    ).toBe(true);
  });
});
