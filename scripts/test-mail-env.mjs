// Email settings for servers started by tests (Playwright and Lighthouse).
// They always send to the local Mailpit from `supabase start`, never to a real
// inbox, whatever .env.local holds. Next.js keeps process variables over values
// from .env files, so these win.

/** @type {Record<string, string>} */
export const TEST_MAIL_ENV = {
  EMAIL_PROVIDER: "smtp",
  SMTP_HOST: "127.0.0.1",
  SMTP_PORT: "57325",
  SMTP_SECURE: "false",
  SMTP_USER: "",
  SMTP_PASS: "",
  EMAIL_FROM: "Agentix <quotes@agentix.website>",
  EMAIL_TO: "",
  QUOTE_CONFIRMATION_ENABLED: "true",
};
