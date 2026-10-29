import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Internal link without viewport prefetching. Pages are static and cached, so
 * navigation stays fast, and the first load does less work on slow phones.
 */
export function AppLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
