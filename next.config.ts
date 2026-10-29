import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
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
      {
        // One canonical host: www redirects to the apex domain with a 301.
        source: "/:path*",
        has: [{ type: "host", value: "www.agentix.website" }],
        destination: "https://agentix.website/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
