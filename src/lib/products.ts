import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { rowToProduct, type Product } from "@/lib/product-model";

/** All published products in display order. Cached and tagged "products". */
export async function getPublishedProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const { data, error } = await createPublicClient()
    .from("products")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Could not load products: ${error.message}`);
  return data.map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getPublishedProducts();
  return products.find((p) => p.slug === slug);
}

export async function getPublishedProductCount(): Promise<number> {
  const products = await getPublishedProducts();
  return products.length;
}
