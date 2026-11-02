import { AppLink as Link } from "@/components/ui/AppLink";
import { services } from "@/content/services";

const linkClass = "text-accent underline underline-offset-[3px]";

/** Inline list of links to every service page: "A, B, C and D". */
export function ServiceLinks({ className = linkClass }: { className?: string }) {
  return (
    <>
      {services.map((s, i) => (
        <span key={s.slug}>
          {i > 0 && (i === services.length - 1 ? " and " : ", ")}
          <Link href={`/services/${s.slug}`} className={className}>
            {s.anchor}
          </Link>
        </span>
      ))}
    </>
  );
}
