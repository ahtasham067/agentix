import Script from "next/script";

const provider = process.env.NEXT_PUBLIC_ANALYTICS ?? "off";
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

/** Optional analytics, off by default. Loads after the page is interactive. */
export function Analytics() {
  if (provider === "plausible" && plausibleDomain) {
    return (
      <Script
        src="https://plausible.io/js/script.js"
        data-domain={plausibleDomain}
        strategy="afterInteractive"
      />
    );
  }
  if (provider === "ga4" && gaId && /^G-[A-Z0-9]+$/.test(gaId)) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
        </Script>
      </>
    );
  }
  return null;
}
