export const SERVICE_SLUGS = [
  "chatbots-ai-agents",
  "automation",
  "web-development",
  "seo-geo",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const PRODUCT_CATEGORIES = ["ai-agents", "web-apps", "automation"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const THUMBNAILS = [
  "clinidesk",
  "nexa-ai",
  "autobuffy",
  "meyamb",
  "research-buddy",
  "uphex",
  "nizame-taleem",
] as const;
export type ThumbnailKey = (typeof THUMBNAILS)[number];

export type IconName =
  | "bot"
  | "workflow"
  | "browser"
  | "chat"
  | "calendar"
  | "clock"
  | "users"
  | "search"
  | "shield"
  | "zap"
  | "mail"
  | "phone"
  | "card"
  | "send"
  | "vault"
  | "folder"
  | "book"
  | "chart"
  | "check"
  | "code";

export type ScreenKey = "calendar" | "patient-history";

export interface Fact {
  label: string;
  value: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectSeo {
  keyword: string;
  title: string;
  description: string;
}

/** A portfolio project. Source of truth for `supabase/seed.sql`. */
export interface Project {
  slug: string;
  name: string;
  /** Card text, exactly as in the design. */
  summary: string;
  /** Hero paragraph on the detail page. */
  description: string;
  /** 40 to 60 word direct answer that opens the detail page (GEO). */
  answer: string;
  tagline?: string;
  tags: string[];
  /** Stack line shown on cards. */
  stack: string;
  category: ProductCategory;
  thumbnail: ThumbnailKey;
  websiteUrl?: string;
  role?: string;
  audience?: string;
  clientWork: boolean;
  facts: Fact[];
  features: Feature[];
  steps: Step[];
  sections: ContentSection[];
  faqs: Faq[];
  screenshots: Screenshot[];
  screens: ScreenKey[];
  builtWith: string[];
  relatedServices: ServiceSlug[];
  relatedProjects: string[];
  seo: ProjectSeo;
  /** False while essential details are missing: page is noindex and left out of the sitemap. */
  indexable: boolean;
  featured: boolean;
  sortOrder: number;
  published: boolean;
  /** Last database update (ISO date). Only set on products read from Supabase. */
  updatedAt?: string;
}
