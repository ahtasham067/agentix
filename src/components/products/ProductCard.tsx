import Link from "next/link";
import { ProductThumb, ClinideskThumb } from "@/components/illustrations/ProductThumbs";
import { Chip } from "@/components/ui/Chip";
import type { Product } from "@/lib/product-model";

type CardProduct = Pick<
  Product,
  "slug" | "name" | "summary" | "tags" | "stack" | "thumbnail" | "featured"
>;

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Chip variant="filled">{tag}</Chip>
        </li>
      ))}
    </ul>
  );
}

function CardFooter({ product }: { product: CardProduct }) {
  return (
    <div className="mt-auto flex items-center justify-between pt-[20px] text-[14px] leading-[20px]">
      <span className="text-muted">{product.stack}</span>
      <Link
        href={`/products/${product.slug}`}
        className="text-[14px] font-semibold text-accent after:absolute after:inset-0 after:rounded-card after:content-[''] hover:underline"
      >
        View details<span className="sr-only"> about {product.name}</span>
      </Link>
    </div>
  );
}

/** Standard product card: preview on top, details below. */
export function ProductCard({
  product,
  headingLevel = 3,
}: {
  product: CardProduct;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-secondary transition-colors hover:border-[rgb(244_241_238/0.28)] lg:h-[423.33px]">
      <div className="flex h-[209px] shrink-0 items-center justify-center border-b border-line bg-brown">
        <ProductThumb thumbnail={product.thumbnail} />
      </div>
      <div className="flex flex-1 flex-col px-[28px] pt-[24px] pb-[26px]">
        <Tags tags={product.tags} />
        <Heading className="mt-[14px] text-[23px] leading-[1.2] tracking-[-0.01em]">
          {product.name}
        </Heading>
        <p className="mt-[8px] text-[15px] leading-[1.55] text-muted">{product.summary}</p>
        <CardFooter product={product} />
      </div>
    </article>
  );
}

/** Wide card for the featured product (CliniDesk). */
export function FeaturedProductCard({
  product,
  headingLevel = 3,
}: {
  product: CardProduct;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="relative grid h-full overflow-hidden rounded-card border border-line bg-secondary transition-colors hover:border-[rgb(244_241_238/0.28)] md:grid-cols-[439px_1fr] lg:h-[423.33px]">
      <div className="flex items-center justify-center border-b border-line bg-brown px-[32px] py-10 md:border-r md:border-b-0">
        <ClinideskThumb />
      </div>
      <div className="flex flex-col px-[28px] pt-[25px] pb-[22px]">
        <span>
          <Chip variant="featured">Featured</Chip>
        </span>
        <div className="mt-[14px]">
          <Tags tags={product.tags} />
        </div>
        <Heading className="mt-[13px] text-[29px] leading-[1.15] tracking-[-0.01em]">
          {product.name}
        </Heading>
        <p className="mt-[10px] text-[15px] leading-[1.55] text-muted">{product.summary}</p>
        <CardFooter product={product} />
      </div>
    </article>
  );
}

/** Dashed call-to-action card at the end of the grid. */
export function ProjectHereCard({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="flex h-full flex-col justify-center rounded-card border border-dashed border-[rgb(244_241_238/0.2)] px-[36px] py-[48px]">
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[rgb(255_107_44/0.2)] text-accent">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <path d="M12 4v16M4 12h16" />
        </svg>
      </span>
      <Heading className="mt-[30px] text-[26px] leading-[1.2] tracking-[-0.01em]">
        Your project here
      </Heading>
      <p className="mt-[12px] text-[15px] leading-[1.55] text-muted">
        Tell us what you want to build or automate.
      </p>
      <span className="mt-[25px]">
        <Link
          href="/contact"
          className="inline-flex h-[44px] items-center rounded-[12px] bg-primary px-[22px] text-[15px] font-semibold text-on-primary hover:bg-[#ff7d45]"
        >
          Get a Quote
        </Link>
      </span>
    </article>
  );
}
