import "server-only";
import { timingSafeEqual } from "node:crypto";

/** Header the post-deploy smoke test sends with SMOKE_TEST_TOKEN. */
export const SMOKE_TEST_HEADER = "x-smoke-test";

/**
 * True when a request carries the smoke-test token. Such quote submissions are
 * validated but never saved or emailed. Without SMOKE_TEST_TOKEN (16+ characters)
 * on the server, the header is ignored.
 */
export function isSmokeTest(
  value: string | null,
  token: string | undefined = process.env.SMOKE_TEST_TOKEN,
): boolean {
  if (!token || token.length < 16 || !value) return false;
  const given = Buffer.from(value);
  const expected = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
