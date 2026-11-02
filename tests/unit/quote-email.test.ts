import { describe, expect, it } from "vitest";
import { escapeHtml, headerSafe } from "@/lib/email/escape";
import { buildConfirmationEmail, buildOwnerEmail } from "@/lib/email/quote-email";
import type { QuoteInput } from "@/lib/quote-schema";

const quote: QuoteInput = {
  fullName: "Ada <b>Lovelace</b>",
  email: "ada@example.com",
  whatsapp: "+92 302 5889452",
  service: "web-development",
  plan: "subscription",
  budget: "not-sure",
  details: 'Line one <script>alert("x")</script>\nLine two & "quotes"',
};

describe("owner email", () => {
  const mail = buildOwnerEmail(quote, {
    from: "Agentix <quotes@agentix.website>",
    to: "owner@example.com",
    id: "abc-123",
  });

  it("is from the fixed sender to the owner, with Reply-To set to the visitor", () => {
    expect(mail.from).toBe("Agentix <quotes@agentix.website>");
    expect(mail.to).toBe("owner@example.com");
    expect(mail.replyTo).toBe("ada@example.com");
  });

  it("names the service, plan and visitor in the subject", () => {
    expect(mail.subject).toBe(
      "New quote: Web Development, Subscription plan – Ada <b>Lovelace</b>",
    );
  });

  it("lists every field in the text part, with the details unchanged", () => {
    for (const line of [
      "Name: Ada <b>Lovelace</b>",
      "Email: ada@example.com",
      "WhatsApp: +92 302 5889452",
      "Service: Web Development",
      "Plan: Subscription plan",
      "Budget: Not sure yet",
      "Reference: abc-123",
    ]) {
      expect(mail.text).toContain(line);
    }
    expect(mail.text).toContain(quote.details);
  });

  it("escapes every visitor value in the HTML part", () => {
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).not.toContain("<b>Lovelace</b>");
    expect(mail.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    expect(mail.html).toContain("Ada &lt;b&gt;Lovelace&lt;/b&gt;");
    expect(mail.html).toContain("Line two &amp; &quot;quotes&quot;");
    expect(mail.html).toContain("<br>");
  });

  it("never lets a line break reach the subject header", () => {
    const evil = buildOwnerEmail(
      { ...quote, fullName: "Ada\r\nBcc: victim@example.com" },
      { from: "a@b.co", to: "c@d.co" },
    );
    expect(evil.subject).not.toMatch(/[\r\n]/);
    expect(evil.subject).toContain("Ada Bcc: victim@example.com");
  });
});

describe("visitor confirmation", () => {
  const mail = buildConfirmationEmail(quote, { from: "Agentix <quotes@agentix.website>" });

  it("goes to the visitor and replies reach the owner", () => {
    expect(mail.to).toBe("ada@example.com");
    expect(mail.replyTo).toBe("ahtasham067@gmail.com");
  });

  it("echoes only the escaped first name, never the project details", () => {
    expect(mail.text).toContain("Hi Ada,");
    expect(mail.text).not.toContain("script");
    expect(mail.html).not.toContain("Line one");
  });
});

describe("escaping helpers", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;",
    );
  });

  it("strips control characters and caps header length", () => {
    expect(headerSafe("a\r\nb\u0000c")).toBe("a b c");
    expect(headerSafe("x".repeat(100), 10)).toBe(`${"x".repeat(9)}…`);
  });
});
