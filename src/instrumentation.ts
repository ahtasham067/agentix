/** Runs once when a Next.js server starts. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  const { assertEmailConfigured } = await import("@/lib/env");
  // Quote emails are mandatory in production: fail fast instead of losing leads.
  assertEmailConfigured();
}
