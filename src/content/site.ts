/** Site-wide settings. NEXT_PUBLIC_* values are inlined at build time. */

export const SITE_NAME = "Agentix";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

/** One-line description used in the footer, Organization JSON-LD and llms.txt. */
export const SITE_DESCRIPTION =
  "A software house for AI chatbots, automation, web development and SEO.";

/** Phone in E.164 form (+923025889452), for tel: and wa.me links. */
const phoneE164 = `+${(process.env.NEXT_PUBLIC_CONTACT_PHONE || "+923025889452").replace(/\D/g, "")}`;

/** "+923025889452" -> "+92 302 5889452" (Pakistani mobile layout; other numbers stay as stored). */
export function formatPhone(e164: string): string {
  const m = e164.match(/^\+92(\d{3})(\d{7})$/);
  return m ? `+92 ${m[1]} ${m[2]}` : e164;
}

export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ahtasham067@gmail.com",
  /** E.164, for tel: links and JSON-LD. */
  phone: phoneE164,
  /** Human-readable form for the page. */
  phoneDisplay: formatPhone(phoneE164),
  location: "Pakistan",
};

export const telUrl = `tel:${contact.phone}`;

/** WhatsApp click-to-chat link built from the contact phone. */
export const whatsappUrl = `https://wa.me/${contact.phone.slice(1)}`;

// TODO: confirm. Upwork has no real URL yet; the default is a placeholder.
const UPWORK_PLACEHOLDER = "https://www.upwork.com";

export const social = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/ahtasham-naeem",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/ahtasham067",
  upwork: process.env.NEXT_PUBLIC_UPWORK_URL || UPWORK_PLACEHOLDER,
};

/** Profiles that are real (not placeholders), for JSON-LD `sameAs`. */
export const sameAs = [social.linkedin, social.github, social.upwork].filter(
  (url) => url !== UPWORK_PLACEHOLDER,
);

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Confirmed by the owner. Shown in stats, author boxes and llms.txt. */
export const EXPERIENCE = { projects: "20+", years: "5+" } as const;

export const founder = {
  name: "Ahtasham Naeem",
  initials: "AN",
  role: "Founder and full-stack developer",
  skills: ["Rails", "Next.js", "n8n"],
};
