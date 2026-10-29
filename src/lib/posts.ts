import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { SERVICE_SLUGS, type ServiceSlug } from "@/content/types";
import { createPublicClient } from "@/lib/supabase/public";
import type { Database } from "@/lib/supabase/database.types";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];

export interface Post {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  body: string;
  authorName: string;
  relatedServices: ServiceSlug[];
  publishedAt: string;
  updatedAt: string;
}

function rowToPost(row: PostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    seoTitle: row.seo_title,
    description: row.description,
    body: row.body,
    authorName: row.author_name,
    relatedServices: row.related_services.filter((s): s is ServiceSlug =>
      (SERVICE_SLUGS as readonly string[]).includes(s),
    ),
    publishedAt: row.published_at ?? row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Published posts, newest first. RLS hides drafts from the anon key. */
export async function getPublishedPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Could not load posts: ${error.message}`);
  return data.map(rowToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post-${slug}`);

  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(`Could not load post: ${error.message}`);
  return data ? rowToPost(data) : undefined;
}
