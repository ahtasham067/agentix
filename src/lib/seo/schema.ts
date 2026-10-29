import type {
  AboutPage,
  Blog,
  BlogPosting,
  BreadcrumbList,
  ContactPage,
  CreativeWork,
  FAQPage,
  Organization,
  Person,
  Service,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";
import { contact, founder, sameAs, SITE_NAME, siteUrl } from "@/content/site";
import type { Faq, Project } from "@/content/types";

/** JSON-LD builders. They only describe facts that are visible on the page. */

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const FOUNDER_ID = `${siteUrl}/about#founder`;

const ctx = "https://schema.org" as const;

export function founderSchema(): Person {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: founder.name,
    jobTitle: "Founder and full-stack developer",
    worksFor: { "@id": ORG_ID },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** The founder as a standalone JSON-LD document (About page, blog author). */
export function founderPageSchema(): WithContext<Person> {
  return {
    "@context": ctx,
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: founder.name,
    jobTitle: "Founder and full-stack developer",
    worksFor: { "@id": ORG_ID },
    alumniOf: { "@type": "CollegeOrUniversity", name: "COMSATS University Islamabad" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": ctx,
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: siteUrl,
    logo: absoluteUrl("/agentix-logo-512.png"),
    email: contact.email,
    description: "A software house building AI agents, n8n automation and web apps.",
    founder: { "@id": FOUNDER_ID },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": ctx,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": ctx,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(items: Faq[]): WithContext<FAQPage> {
  return {
    "@context": ctx,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}): WithContext<Service> {
  return {
    "@context": ctx,
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: { "@id": ORG_ID },
  };
}

/** Own products are software applications; client work is described neutrally. */
export function productSchema(
  product: Pick<
    Project,
    "slug" | "name" | "description" | "tags" | "clientWork" | "websiteUrl" | "seo" | "category"
  >,
): WithContext<SoftwareApplication> | WithContext<CreativeWork> {
  const url = absoluteUrl(`/products/${product.slug}`);
  const base = {
    name: product.name,
    description: product.seo.description,
    url,
    keywords: [product.seo.keyword, ...product.tags].join(", "),
  };
  if (product.clientWork) {
    return {
      "@context": ctx,
      "@type": "CreativeWork",
      ...base,
      contributor: { "@id": FOUNDER_ID, "@type": "Person", name: founder.name },
    };
  }
  return {
    "@context": ctx,
    "@type": "SoftwareApplication",
    ...base,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    creator: { "@id": ORG_ID },
    ...(product.websiteUrl ? { sameAs: product.websiteUrl } : {}),
  };
}

export function contactPageSchema(page: {
  title: string;
  description: string;
}): WithContext<ContactPage> {
  return {
    "@context": ctx,
    "@type": "ContactPage",
    name: page.title,
    description: page.description,
    url: absoluteUrl("/contact"),
    about: { "@id": ORG_ID },
  };
}

export function aboutPageSchema(page: {
  title: string;
  description: string;
}): WithContext<AboutPage> {
  return {
    "@context": ctx,
    "@type": "AboutPage",
    name: page.title,
    description: page.description,
    url: absoluteUrl("/about"),
    mainEntity: { "@id": ORG_ID },
  };
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
}

export function blogSchema(posts: PostSummary[]): WithContext<Blog> {
  return {
    "@context": ctx,
    "@type": "Blog",
    name: `${SITE_NAME} blog`,
    url: absoluteUrl("/blog"),
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
    })),
  };
}

export function blogPostingSchema(
  post: PostSummary & { author: string },
): WithContext<BlogPosting> {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": ctx,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", "@id": FOUNDER_ID, name: post.author },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}
