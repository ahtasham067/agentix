import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const update = vi.fn();
const sendOwnerNotification = vi.fn();
const sendVisitorConfirmation = vi.fn();
const afterCallbacks: (() => unknown)[] = [];

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-real-ip": "10.0.0.1" }),
}));
vi.mock("next/server", () => ({ after: (fn: () => unknown) => afterCallbacks.push(fn) }));
vi.mock("@/lib/env", () => ({
  getAdminEnv: () => ({
    IP_HASH_SALT: "test-salt-test-salt",
    RATE_LIMIT_MAX: 3,
    RATE_LIMIT_WINDOW_MINUTES: 10,
    TRUSTED_IP_HEADER: "x-real-ip",
  }),
}));
vi.mock("@/lib/rate-limit", () => ({
  clientIp: () => "10.0.0.1",
  hashIp: () => "a".repeat(64),
}));
vi.mock("@/lib/email/send", () => ({
  sendOwnerNotification: (...args: unknown[]) => sendOwnerNotification(...args),
  sendVisitorConfirmation: (...args: unknown[]) => sendVisitorConfirmation(...args),
}));
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    rpc: async (name: string, args: unknown) => rpc(name, args),
    from: () => ({
      update: (row: unknown) => ({
        eq: async (...args: unknown[]) => {
          update(row, ...args);
          return { error: null };
        },
      }),
    }),
  }),
}));

const { submitQuote } = await import("@/app/contact/actions");

function form(extra: Record<string, string> = {}) {
  const data = new FormData();
  const values = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    whatsapp: "",
    service: "chatbots-ai-agents",
    plan: "one-time",
    budget: "not-sure",
    details: "We need a WhatsApp booking agent for our clinic.",
    ...extra,
  };
  for (const [k, v] of Object.entries(values)) data.set(k, v);
  return data;
}

describe("submitQuote", () => {
  beforeEach(() => {
    rpc.mockReset().mockReturnValue({ data: "quote-1", error: null });
    update.mockReset();
    sendOwnerNotification.mockReset();
    sendVisitorConfirmation.mockReset();
    afterCallbacks.length = 0;
  });

  it("saves the quote, emails the owner and records notified_at", async () => {
    sendOwnerNotification.mockResolvedValue(true);
    const state = await submitQuote({ status: "idle" }, form());
    expect(state).toEqual({ status: "success", name: "Ada" });
    expect(rpc).toHaveBeenCalledWith(
      "submit_quote",
      expect.objectContaining({
        p_service: "chatbots-ai-agents",
        p_plan: "one-time",
        p_ip_hash: "a".repeat(64),
        p_max: 3,
        p_window_minutes: 10,
      }),
    );
    expect(sendOwnerNotification).toHaveBeenCalledWith(
      expect.objectContaining({ email: "ada@example.com" }),
      "quote-1",
    );
    expect(update).toHaveBeenCalledWith({ notified_at: expect.any(String) }, "id", "quote-1");
    // The visitor confirmation runs after the response.
    expect(sendVisitorConfirmation).not.toHaveBeenCalled();
    await Promise.all(afterCallbacks.map((fn) => fn()));
    expect(sendVisitorConfirmation).toHaveBeenCalledTimes(1);
  });

  it("keeps the saved quote and shows the normal success when the email fails", async () => {
    sendOwnerNotification.mockResolvedValue(false);
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const state = await submitQuote({ status: "idle" }, form());
    expect(rpc).toHaveBeenCalledTimes(1);
    // notified_at stays null, so the row keeps notified = false.
    expect(update).not.toHaveBeenCalled();
    expect(state).toEqual({ status: "success", name: "Ada" });
    expect(log).toHaveBeenCalledWith(expect.stringContaining("quote-1 saved, but the owner email"));
    log.mockRestore();
  });

  it("drops honeypot submissions without saving or emailing", async () => {
    const state = await submitQuote({ status: "idle" }, form({ company: "Spam Corp" }));
    expect(state).toEqual({ status: "success" });
    expect(rpc).not.toHaveBeenCalled();
    expect(sendOwnerNotification).not.toHaveBeenCalled();
  });

  it("rejects invalid input on the server without saving", async () => {
    const state = await submitQuote({ status: "idle" }, form({ service: "crypto", plan: "x" }));
    expect(state.status).toBe("error");
    expect(state.fieldErrors).toMatchObject({
      service: "Please choose a service.",
      plan: "Please choose a plan.",
    });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("blocks the request without emailing when the rate limit is reached", async () => {
    rpc.mockReturnValue({ data: null, error: null });
    const state = await submitQuote({ status: "idle" }, form());
    expect(state.status).toBe("error");
    expect(state.message).toContain("several requests in a short time");
    expect(sendOwnerNotification).not.toHaveBeenCalled();
  });

  it("does not email when the database insert fails", async () => {
    rpc.mockReturnValue({ data: null, error: { message: "boom" } });
    const state = await submitQuote({ status: "idle" }, form());
    expect(state.status).toBe("error");
    expect(state.message).toContain("Something went wrong on our side");
    expect(state.message).not.toContain("boom");
    expect(sendOwnerNotification).not.toHaveBeenCalled();
  });
});
