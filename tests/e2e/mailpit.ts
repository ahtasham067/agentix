/** Minimal client for the local Mailpit API (started by `supabase start`). */
const MAILPIT = (process.env.MAILPIT_URL || "http://127.0.0.1:57324").replace(/\/+$/, "");

export interface MailAddress {
  Name: string;
  Address: string;
}

export interface MailMessage {
  ID: string;
  From: MailAddress;
  To: MailAddress[];
  ReplyTo: MailAddress[];
  Subject: string;
  Text: string;
  HTML: string;
}

async function search(query: string): Promise<{ ID: string }[]> {
  const res = await fetch(`${MAILPIT}/api/v1/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Mailpit search failed: ${res.status}`);
  return (await res.json()).messages ?? [];
}

async function message(id: string): Promise<MailMessage> {
  const res = await fetch(`${MAILPIT}/api/v1/message/${id}`);
  if (!res.ok) throw new Error(`Mailpit message failed: ${res.status}`);
  return res.json();
}

/** Polls Mailpit until `count` messages match the query, then returns them. */
export async function waitForMail(query: string, count = 1, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const found = await search(query);
    if (found.length >= count) return Promise.all(found.map((m) => message(m.ID)));
    if (Date.now() > deadline) {
      throw new Error(`Expected ${count} email(s) for "${query}", found ${found.length}`);
    }
    await new Promise((r) => setTimeout(r, 300));
  }
}

/** Waits a moment and returns how many messages match (for "no email was sent" checks). */
export async function countMail(query: string, waitMs = 2_000) {
  await new Promise((r) => setTimeout(r, waitMs));
  return (await search(query)).length;
}
