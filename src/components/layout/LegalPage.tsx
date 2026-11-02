import { AppLink as Link } from "@/components/ui/AppLink";
import { LastUpdated } from "@/components/sections/LastUpdated";
import { PageHero } from "./PageHero";

export function LegalPage({
  title,
  href,
  updated,
  sections,
}: {
  title: string;
  href: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: title, href },
        ]}
        title={title}
      />
      <div className="container-site mt-[32px] mb-[120px] max-w-[760px]">
        <LastUpdated date={updated} className="mb-[40px] text-[16px]!" />
        {sections.map((s) => (
          <section key={s.heading} className="mt-[36px] first:mt-0">
            <h2 className="text-[26px] leading-[1.25] tracking-[-0.01em]">{s.heading}</h2>
            <p className="mt-[10px] text-[17px] leading-[1.7] text-muted">{s.body}</p>
          </section>
        ))}
        <p className="mt-[48px] text-[17px] leading-[1.7] text-muted">
          Questions?{" "}
          <Link
            href="/contact"
            className="text-accent underline underline-offset-[3px] hover:text-text"
          >
            Contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
}
