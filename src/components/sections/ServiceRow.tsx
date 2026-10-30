import { AppLink as Link } from "@/components/ui/AppLink";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { IconTile } from "@/components/ui/IconTile";
import type { Service } from "@/content/services";

/** One service on /services: copy and bullets beside an illustration. */
export function ServiceRow({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <section
      aria-labelledby={`${service.slug}-title`}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-[64px]"
    >
      <div className={reverse ? "lg:order-2" : undefined}>
        <IconTile name={service.icon} />
        <h2
          id={`${service.slug}-title`}
          className="mt-[19px] text-[32px] leading-[1.15] tracking-[-0.02em] md:text-[40px]"
        >
          <Link href={`/services/${service.slug}`} className="hover:underline">
            {service.name}
          </Link>
        </h2>
        <p className="mt-[13px] text-[18px] leading-[1.55] text-muted">{service.summary}</p>
        <CheckList
          items={service.bullets}
          className="mt-[24px] gap-[14.67px] [&_li]:text-[16.8px]"
        />
        <ButtonLink href="/contact" className="mt-[31px]">
          Get a quote for this
        </ButtonLink>
      </div>
      <div className={reverse ? "lg:order-1" : undefined}>
        <ServiceVisual visual={service.hero.visual} />
      </div>
    </section>
  );
}
