import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { SectionHead } from "@/components/ui/SectionHead";
import {
  formatPlanPrice,
  formatPrice,
  PRICING_DISCLAIMER,
  pricingGroups,
  quoteHref,
  type PricingGroup,
} from "@/content/pricing";

/**
 * Pricing plans from src/content/pricing.ts. Not part of the approved designs,
 * so the whole section is marked data-seo-extra. Every "Get a Quote" button
 * opens the quote form with the service and plan preselected.
 */
export function Pricing({
  groups = pricingGroups,
  id = "pricing-title",
  title = "Pricing",
  intro = "Two simple ways to pay: once for the build, or monthly.",
  className = "",
}: {
  groups?: PricingGroup[];
  id?: string;
  title?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <section
      id="pricing"
      aria-labelledby={id}
      data-seo-extra
      className={`container-site scroll-mt-[96px] ${className}`}
    >
      <SectionHead id={id} title={title} intro={intro} />
      <div
        className={`mt-[35px] grid gap-[24px] ${groups.length > 1 ? "lg:grid-cols-2" : "max-w-[880px]"}`}
      >
        {groups.map((group) => (
          <Card key={group.key} className="p-[28px] md:p-[32px]">
            <div>
              <h3
                id={`${group.key}-pricing`}
                className="text-[24.4px] leading-[29px] tracking-[-0.01em]"
              >
                {group.title}
              </h3>
              <p className="mt-[8px] text-[16px] leading-[1.55] text-muted">{group.message}</p>
            </div>
            <ul className="m-0 mt-[24px] grid list-none gap-[16px] p-0 sm:grid-cols-2">
              {group.plans.map((plan) => (
                <li
                  key={plan.key}
                  className="flex flex-col rounded-[12px] border border-line bg-bg p-[22px]"
                  data-plan={`${group.key}-${plan.key}`}
                >
                  <h4 className="font-body text-[15px] leading-[22px] font-semibold text-muted">
                    {plan.name}
                  </h4>
                  <p className="mt-[8px] font-heading text-[34px] leading-[38px] font-bold tracking-[-0.02em]">
                    {formatPrice(plan.amount)}
                    {plan.interval && (
                      <span className="ml-[6px] font-body text-[15px] font-normal tracking-normal text-muted">
                        per {plan.interval}
                      </span>
                    )}
                  </p>
                  <CheckList items={plan.included} className="mt-[16px] [&_li]:text-[15px]" />
                  <ButtonLink
                    href={quoteHref(group.service, plan.key)}
                    size="sm"
                    className="mt-[22px] w-full"
                  >
                    Get a Quote
                    <span className="sr-only">
                      {" "}
                      for the {group.title.toLowerCase()} {plan.name.toLowerCase()} (
                      {formatPlanPrice(plan)})
                    </span>
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div
        className="mt-[24px] overflow-x-auto rounded-card border border-line"
        role="region"
        aria-labelledby={`${id}-table`}
        tabIndex={0}
      >
        <table className="w-full border-collapse text-left text-[14.5px] leading-[21px] sm:text-[15.5px] sm:leading-[22px]">
          <caption id={`${id}-table`} className="sr-only">
            Prices at a glance
          </caption>
          <thead>
            <tr className="border-b border-line bg-secondary">
              <th scope="col" className="px-[12px] py-[14px] sm:px-[20px] font-semibold">
                Plan
              </th>
              <th scope="col" className="px-[12px] py-[14px] sm:px-[20px] font-semibold">
                One-time
              </th>
              <th scope="col" className="px-[12px] py-[14px] sm:px-[20px] font-semibold">
                Subscription
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.key} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-[12px] py-[14px] sm:px-[20px] font-semibold">
                  {group.title}
                </th>
                <td className="px-[12px] py-[14px] sm:px-[20px] text-muted">
                  {formatPlanPrice(group.plans[0])}
                </td>
                <td className="px-[12px] py-[14px] sm:px-[20px] text-muted">
                  {formatPlanPrice(group.plans[1])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-[14px] text-[14.5px] leading-[22px] text-muted" data-pricing-disclaimer>
        {PRICING_DISCLAIMER}
      </p>
    </section>
  );
}
