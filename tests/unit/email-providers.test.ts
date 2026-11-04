import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import type { QuoteInput } from "@/lib/quote-schema";

const sendMail = vi.fn();
const transportOptions: Record<string, unknown>[] = [];

vi.mock("nodemailer", () => ({
  default: {
    createTransport: (options: Record<string, unknown>) => {
      transportOptions.push(options);
      return { sendMail: (message: unknown) => sendMail(message) };
    },
  },
}));

const { sendEmail, sendOwnerNotification, sendVisitorConfirmation } =
  await import("@/lib/email/send");

const OWNER = "ahtasham067@gmail.com";
const EMAIL_KEYS = [
  "EMAIL_PROVIDER",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "EMAIL_TO",
  "QUOTE_CONFIRMATION_ENABLED",
];

const quote: QuoteInput = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  whatsapp: "",
  service: "web-development",
  plan: "one-time",
  budget: "not-sure",
  details: "Build our site <b>now</b> & soon.",
};

function setEmailEnv(values: Record<string, string>) {
  for (const key of EMAIL_KEYS) vi.stubEnv(key, values[key] ?? "");
}

function smtpError(message: string, code: string, responseCode?: number) {
  return Object.assign(new Error(message), { code, responseCode });
}

let log: MockInstance<typeof console.error>;

beforeEach(() => {
  sendMail.mockReset();
  transportOptions.length = 0;
  log = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  log.mockRestore();
});

function logged(): string {
  return log.mock.calls.map((args) => args.join(" ")).join("\n");
}

describe("SMTP provider", () => {
  const GMAIL = {
    EMAIL_PROVIDER: "smtp",
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: OWNER,
    SMTP_PASS: "abcdefghijklmnop",
    EMAIL_FROM: `Agentix <${OWNER}>`,
  };

  it("sends the owner email with Reply-To set to the visitor", async () => {
    setEmailEnv(GMAIL);
    sendMail.mockResolvedValue({ messageId: "<m1@gmail.com>" });

    await expect(sendOwnerNotification(quote, "quote-1")).resolves.toBe(true);

    expect(transportOptions[0]).toMatchObject({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: OWNER, pass: "abcdefghijklmnop" },
    });
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: `Agentix <${OWNER}>`,
        to: OWNER,
        replyTo: "ada@example.com",
        disableFileAccess: true,
        disableUrlAccess: true,
      }),
    );
    expect(sendMail.mock.calls[0][0].html).toContain("&lt;b&gt;now&lt;/b&gt; &amp; soon.");
  });

  it("returns the message id from sendEmail", async () => {
    setEmailEnv(GMAIL);
    sendMail.mockResolvedValue({ messageId: "<m2@gmail.com>" });
    const message = {
      from: GMAIL.EMAIL_FROM,
      to: OWNER,
      subject: "s",
      text: "t",
      html: "<p>t</p>",
    };
    await expect(sendEmail(message)).resolves.toEqual({ provider: "smtp", id: "<m2@gmail.com>" });
  });

  it("returns false and logs the code when the server fails", async () => {
    setEmailEnv(GMAIL);
    sendMail.mockRejectedValue(smtpError("connect ECONNREFUSED 142.250.4.108:465", "ESOCKET"));

    await expect(sendOwnerNotification(quote, "quote-1")).resolves.toBe(false);
    expect(logged()).toContain("[quote] owner notification failed: ESOCKET: connect ECONNREFUSED");
  });

  it("returns false on bad credentials and never logs the password", async () => {
    setEmailEnv(GMAIL);
    sendMail.mockRejectedValue(
      smtpError(
        "Invalid login: 535-5.7.8 Username and Password not accepted (pass abcdefghijklmnop)",
        "EAUTH",
        535,
      ),
    );

    await expect(sendOwnerNotification(quote, "quote-1")).resolves.toBe(false);
    expect(logged()).toContain("EAUTH: Invalid login: 535-5.7.8");
    expect(logged()).toContain("[redacted]");
    expect(logged()).not.toContain("abcdefghijklmnop");
  });

  it("names the missing App Password instead of trying to send", async () => {
    setEmailEnv({ ...GMAIL, SMTP_PASS: "" });

    await expect(sendOwnerNotification(quote, "quote-1")).resolves.toBe(false);
    expect(sendMail).not.toHaveBeenCalled();
    expect(logged()).toContain("smtp email is not configured: set SMTP_PASS");
  });

  it("sends the owner email to EMAIL_TO when it is set", async () => {
    setEmailEnv({ ...GMAIL, EMAIL_TO: "inbox@example.com" });
    sendMail.mockResolvedValue({ messageId: "<m3@gmail.com>" });
    await sendOwnerNotification(quote);
    expect(sendMail.mock.calls[0][0].to).toBe("inbox@example.com");
  });

  it("sends the visitor confirmation only when it is enabled", async () => {
    setEmailEnv(GMAIL);
    await sendVisitorConfirmation(quote);
    expect(sendMail).not.toHaveBeenCalled();

    setEmailEnv({ ...GMAIL, QUOTE_CONFIRMATION_ENABLED: "true" });
    sendMail.mockResolvedValue({ messageId: "<m4@gmail.com>" });
    await sendVisitorConfirmation(quote);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: "ada@example.com", replyTo: OWNER }),
    );
  });
});
