import { buildLlmsTxt } from "@/lib/llms";

/** https://llmstxt.org summary for AI tools. Prerendered; refreshed with products. */
export async function GET() {
  return new Response(await buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
