/**
 * AI crawlers allowed on public pages (GEO): OpenAI search, training and user
 * fetches, Perplexity, Anthropic, Google Gemini training and Apple Intelligence.
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
] as const;

/** Private routes. Repeated in every robots group, because a named group ignores `*`. */
export const PRIVATE_PATHS = ["/api/", "/design-system"];
