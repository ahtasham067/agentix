/** Site-wide settings. NEXT_PUBLIC_* values are inlined at build time. */

export const SITE_NAME = "Agentix";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@agentix.website",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+92 300 0000000",
  location: "Pakistan",
};

/** WhatsApp click-to-chat link built from the contact phone. */
export const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;

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

export const footerServices = [
  { href: "/services/ai-agents", label: "AI Agents" },
  { href: "/services/n8n-automation", label: "n8n Automation" },
  { href: "/services/web-apps", label: "Web Apps" },
  { href: "/contact", label: "Get a Quote" },
] as const;

export const founder = {
  name: "Ahtasham Naeem",
  initials: "AN",
  role: "Founder and full-stack developer",
  skills: ["Rails", "Next.js", "n8n"],
};
