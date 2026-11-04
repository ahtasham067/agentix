// Sends one test email with the current provider (EMAIL_PROVIDER) and prints PASS or FAIL.
// Usage: npm run email:test   Reads .env.local. Never prints keys or passwords.

async function main(): Promise<number> {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // CI and hosting platforms provide the variables directly.
  }
  // Loaded after the env file, so modules that read variables at import see them.
  const { getEmailEnv } = await import("@/lib/env");
  const { describeEmailError, emailAddresses, sendEmail } = await import("@/lib/email/send");
  const { escapeHtml } = await import("@/lib/email/escape");

  let env;
  try {
    env = getEmailEnv();
  } catch (error) {
    console.error(`FAIL: ${describeEmailError(error)}`);
    return 1;
  }
  const provider = env.EMAIL_PROVIDER;
  try {
    const { from, owner } = emailAddresses(env);
    const lines = [
      "This is a test email from `npm run email:test`.",
      `Provider: ${provider}`,
      `Sent: ${new Date().toISOString()}`,
      "",
      "If you can read this, new quote notifications will reach this inbox.",
    ];
    const { id } = await sendEmail(
      {
        from,
        to: owner,
        subject: `Agentix email test (${provider})`,
        text: lines.join("\n"),
        html: `<!doctype html><html><body>${lines
          .map((l) => (l ? `<p>${escapeHtml(l)}</p>` : ""))
          .join("")}</body></html>`,
      },
      env,
    );
    console.log(`PASS: sent with ${provider} from ${from} to ${owner}${id ? ` (id ${id})` : ""}`);
    return 0;
  } catch (error) {
    console.error(`FAIL: ${provider}: ${describeEmailError(error, env)}`);
    return 1;
  }
}

main().then((code) => {
  process.exitCode = code;
});
