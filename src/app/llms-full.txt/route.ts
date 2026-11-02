import { buildLlmsFullTxt } from "@/lib/llms";

/** Long form of llms.txt: answers, comparison tables and FAQs in one file. */
export async function GET() {
  return new Response(await buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
