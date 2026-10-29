import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center p-0 text-[14px] leading-[22px] text-muted">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center">
                {last ? (
                  <span aria-current="page" className="font-medium text-text">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="hover:text-text">
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="px-[4px]">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
