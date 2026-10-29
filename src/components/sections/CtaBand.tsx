import { CtaNodes } from "@/components/illustrations/CtaNodes";
import { ButtonLink } from "@/components/ui/Button";

/** The one orange call-to-action block per page. */
export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section aria-labelledby="cta-title" className="container-site">
      <div className="relative overflow-hidden rounded-[24px] bg-primary px-6 py-12 text-on-primary md:px-[64px] md:py-[80px] lg:h-[400px] lg:py-0">
        <div className="relative z-10 flex h-full max-w-[640px] flex-col justify-center">
          <h2
            id="cta-title"
            className="max-w-[600px] text-[36px] leading-[1.1] tracking-[-0.02em] text-on-primary md:text-[52px] md:leading-[55px]"
          >
            {title}
          </h2>
          <p className="mt-[13px] max-w-[520px] text-[18px] leading-[1.55] text-[rgb(27_29_33/0.9)]">
            {text}
          </p>
          <div className="mt-[30px] flex flex-wrap gap-[14px]">
            <ButtonLink href="/contact" variant="dark">
              Get a Quote
            </ButtonLink>
            <ButtonLink href="/products" variant="outline-dark">
              View Products
            </ButtonLink>
          </div>
        </div>
        <CtaNodes className="absolute top-[95px] left-[791px] hidden xl:block" />
      </div>
    </section>
  );
}
