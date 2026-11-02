import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
/** Canonical host: the live site URL's host, or the production domain for local builds. */
const canonicalHost = siteUrl.startsWith("https://")
  ? new URL(siteUrl).host.replace(/^www\./, "")
  : "agentix.website";
const analytics = process.env.NEXT_PUBLIC_ANALYTICS ?? "off";

/** Third-party origins are only allowed when the matching analytics provider is on. */
const analyticsScript =
  analytics === "plausible"
    ? ["https://plausible.io"]
    : analytics === "ga4"
      ? ["https://www.googletagmanager.com"]
      : [];
const analyticsConnect =
  analytics === "plausible"
    ? ["https://plausible.io"]
    : analytics === "ga4"
      ? [
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://*.analytics.google.com",
        ]
      : [];

const csp = [
  "default-src 'self'",
  // Next.js inlines its bootstrap scripts; nonces would force every page to render per request.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${analyticsScript.join(" ")}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${analyticsConnect.join(" ")}${isDev ? " ws: wss:" : ""}`.trim(),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(siteUrl.startsWith("https://") ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const RENAMED_SERVICES = {
  "ai-agents": "chatbots-ai-agents",
  "n8n-automation": "automation",
  "web-apps": "web-development",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // The quote form is a few KB; refuse anything far larger before parsing it.
      // Cross-site posts are rejected by Next.js's Origin check (no extra origins allowed).
      bodySizeLimit: "64kb",
    },
  },
  trailingSlash: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Old service URLs (three services became four on 2026-11-02).
      ...Object.entries(RENAMED_SERVICES).map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services/${to}`,
        statusCode: 301 as const,
      })),
      {
        // One canonical host: www redirects to the apex domain with a 301.
        source: "/:path*",
        has: [{ type: "host", value: `www.${canonicalHost}` }],
        destination: `https://${canonicalHost}/:path*`,
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
