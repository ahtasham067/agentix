/** HTML-escapes text for email bodies. Every visitor value goes through this. */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Makes a value safe for a single-line header such as the subject: control
 * characters (including CR and LF) become spaces and the length is capped.
 */
export function headerSafe(value: string, max = 80): string {
  const clean = value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}
