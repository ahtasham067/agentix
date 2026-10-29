import type { Thing, WithContext } from "schema-dts";

type JsonLdData = WithContext<Thing> | WithContext<Thing>[] | Record<string, unknown>;

/** Renders JSON-LD. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
