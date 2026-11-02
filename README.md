# Agentix

Website for **Agentix** (agentix.website), a software house with four services: Chatbots and AI Agents, Automation (n8n, Make.com, Zapier, Airtable), Web Development (React, Next.js, Vue.js, Ruby on Rails) and SEO and GEO. Pricing (PKR) lives in `src/content/pricing.ts`.

- **Frontend:** Next.js 16 (App Router, Cache Components), TypeScript strict, Tailwind CSS v4, `next/font` (Bricolage Grotesque, Inter)
- **Backend:** Supabase (Postgres with Row Level Security). The browser never talks to Supabase; all access runs on the server.
- **Tests:** Vitest + Testing Library, pgTAP, Playwright (desktop and mobile), axe, pixel diffs against the designs, an SEO suite and Lighthouse.

The approved designs are in [`images/`](images) (1440px PNGs). Visual tests compare every page against them.

---

## Quick start

Requirements: Node 22+, Docker (running), the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started).

```bash
npm install
npx playwright install chromium   # browsers for e2e, visual and Lighthouse tests
npm run db:start                  # local Supabase + Mailpit in Docker (ports 57320-57329)
npm run db:reset                  # apply migrations and seed
npm run db:env                    # write local Supabase keys and Mailpit SMTP settings to .env.local
npm run dev                       # http://localhost:3000
```

`npm run db:env` keeps any other values already in `.env.local`, and creates a random `IP_HASH_SALT` the first time.

Quote emails go to the local **Mailpit** mail catcher in development: open http://127.0.0.1:57324 to read them. Nothing is delivered to real inboxes locally.

> Local ports are 573xx (not Supabase's default 543xx) so this project can run next to other Supabase projects. Change them in `supabase/config.toml` if needed.

## Environment variables

Every variable is listed in [`.env.example`](.env.example). `.env*` files are git-ignored, except the example.

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | Absolute origin for canonical URLs, sitemap, Open Graph and JSON-LD. No trailing slash. `https://agentix.website` in production. |
| `SUPABASE_URL` | server | Supabase project URL. |
| `SUPABASE_ANON_KEY` | server | Anon / publishable key. Reads published products and posts (RLS applies). |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Service role / secret key. Used only by the quote server action. **Never** prefix with `NEXT_PUBLIC_`. |
| `IP_HASH_SALT` | server | Random secret for hashing IPs (rate limiting). Raw IPs are never stored. |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MINUTES` | server | Quote rate limit per IP (default 3 per 10 minutes). |
| `TRUSTED_IP_HEADER` | server | Header the platform sets with the client IP (default `x-real-ip`, set by Vercel). Never a visitor-controlled header. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | server only | SMTP for quote emails. **Required in production**: the server refuses requests without `SMTP_HOST` and `EMAIL_FROM`. Resend: `smtp.resend.com`, `465`, `true`, `resend`, API key. |
| `EMAIL_FROM` | server | Sender on a verified domain, for example `Agentix <quotes@agentix.website>`. |
| `QUOTE_NOTIFY_TO` | server | Inbox for new quotes. Defaults to `NEXT_PUBLIC_CONTACT_EMAIL`. |
| `QUOTE_CONFIRMATION_ENABLED` | server | `true` also sends the visitor a short confirmation email. |
| `MAILPIT_URL` | tests | Local Mailpit API for the e2e email tests (`npm run db:env` sets it). |
| `INDEXNOW_KEY` | server | IndexNow key, served at `/indexnow-key.txt` (see below). |
| `REVALIDATE_SECRET` | server | Secret for `POST /api/revalidate` (refresh cached posts/products after editing in Supabase). |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | build | Contact details for the footer, contact page, JSON-LD, llms.txt and the WhatsApp link. Defaults: `ahtasham067@gmail.com`, `+923025889452`. |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_UPWORK_URL` | build | Footer links and JSON-LD `sameAs`. |
| `NEXT_PUBLIC_ANALYTICS` | build | `off` (default), `plausible` or `ga4`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_GA_ID` | build | Analytics settings. The CSP only allows the provider you turn on. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | build | Search Console / Bing Webmaster verification meta tags. |

`NEXT_PUBLIC_*` values are inlined at build time, so change them and redeploy.

## Project structure

```
images/                    approved design PNGs (visual test source)
src/app/                   routes, metadata, sitemap, robots, manifest, OG images
src/components/            layout, ui, sections, products, blog, illustrations (inline SVG/CSS), seo
src/content/               copy: site, SEO, services, projects (source of the product seed), blog posts (Markdown)
src/lib/                   Supabase clients, data access, quote schema, rate limit, SEO helpers
supabase/migrations/       products, quotes, posts (RLS + constraints)
supabase/seed.sql          GENERATED from src/content (npm run db:seed:gen)
supabase/tests/            pgTAP RLS tests
tests/unit|e2e|visual|seo  test suites
scripts/                   seed generator, env writer, icon generator, Lighthouse runner, visual compare
```

### Editing content

- **Products:** edit `src/content/projects/<slug>.ts`, then `npm run db:seed:gen` and `npm run db:reset`. A unit test fails if `seed.sql` is out of date. In production, update the `products` table (or rerun the seed SQL for changed rows) and call the revalidate webhook.
- **Services, FAQs, page copy:** `src/content/*.ts`.
- **Blog posts:** Markdown in `src/content/posts/`. All posts are seeded as **drafts** (`published = false`).

### Publishing a blog post

Review the draft, then in the Supabase SQL editor:

```sql
update public.posts set published = true, published_at = now() where slug = 'what-is-an-ai-agent';
```

Then refresh the cache (or wait up to an hour):

```bash
curl -X POST https://agentix.website/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" -H "content-type: application/json" \
  -d '{"tag":"posts"}'
```

You can automate this with a Supabase **Database Webhook** on the `posts` table that calls the same URL with the header above.

## Scripts

| Script | What it does |
| --- | --- |
| `dev`, `build`, `start` | Next.js |
| `lint` | ESLint + Prettier check |
| `format` | Prettier write |
| `typecheck` | `next typegen` + `tsc --noEmit` |
| `test` | Vitest unit and component tests |
| `test:e2e` | Playwright on desktop (1440px) and mobile (Pixel 7): routes, links, filters, 4 services, pricing and prefill, quote form, email via Mailpit, no-JS submit, honeypot, rate limit, CSRF, 404, axe |
| `test:visual` | Full-page screenshots at 1440px compared with `images/*.png` (pixelmatch, must be under 2%) |
| `test:seo` | Titles, descriptions, canonicals, OG, JSON-LD (offers only on Service, PKR), word counts, heading order, sitemap, robots, link crawler, `www` redirect, and GEO: llms.txt, AI-bot rules, answer-first paragraphs, FAQ schema, Organization consistency, last-updated dates |
| `test:lighthouse` | Lighthouse mobile, median of 5 runs, on `/`, `/products`, `/services`, `/services/chatbots-ai-agents`, `/services/web-development`, `/products/clinidesk`, `/contact`. Needs performance 90, accessibility 95, best practices 90, SEO 100 |
| `audit:pages` | Click-through audit of every public page at 390, 768 and 1440px against a running server: console errors, overflow, broken links, `target=_blank` rel, unnamed controls, keyboard focus, empty form submit. Screenshots in `test-results/audit/` |
| `check:secrets` | Fails if a server secret or JWT appears in `.next/static` (runs in `verify` after the build) |
| `db:start`, `db:stop`, `db:reset`, `db:test` | Supabase local stack, reset with seed, pgTAP tests |
| `db:env`, `db:types`, `db:seed:gen` | Write `.env.local`, generate DB types, generate `seed.sql` |
| `audit` | `npm audit --audit-level=high` |
| `verify` | Everything above, in order |

`test:e2e`, `test:visual` and `test:seo` start `next start` on port 3000 from the last `npm run build`, so build first and stop any dev server on that port. They need the local database (`npm run db:reset`) and `.env.local`.

Visual results (diff PNGs and `report.json`) are written to `test-results/visual/`, Lighthouse reports to `test-results/lighthouse/`.

> Lighthouse simulates a mid-tier phone by slowing your CPU down. Its default 4x slowdown is calibrated for a high-end desktop, so on a slower machine it over-throttles. Following Lighthouse's [throttling guide](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md#calibrating-multipliers), the runner reads your machine's `benchmarkIndex` and uses 4x on a high-end desktop (1500+), 2x on a low-end desktop (800–1500) and 1x below that. The table shows the multiplier it used. Run `LH_CPU_MULTIPLIER=4 npm run test:lighthouse` for the strict default. Scores still depend on how busy the machine is, so close heavy apps first. After launch, [PageSpeed Insights](https://pagespeed.web.dev/) gives the reference numbers.

## Security

- Content-Security-Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy` are set in `next.config.ts`. `script-src` keeps `'unsafe-inline'` (accepted risk): nonces would make every page dynamic. No visitor HTML is ever rendered.
- RLS on every table: the public can read published products and posts only. `quotes` allows anonymous insert of the form columns only; nobody can read, update or delete quotes without the service role, and `submit_quote` is callable by the service role only.
- The quote form validates with zod on the client and the server (allow-listed service and plan, control characters rejected, length caps), has a honeypot, and rate-limits atomically in Postgres (`submit_quote`, advisory lock per salted IP hash). The IP comes only from `TRUSTED_IP_HEADER`.
- Server Actions reject cross-site requests (Origin check) and bodies over 64 KB.
- Quote emails escape every visitor value, keep visitor text out of headers except a cleaned subject, set Reply-To to the visitor, and never load files or URLs. If sending fails the quote stays saved and the visitor sees WhatsApp and email alternatives.
- The service role key and SMTP password are only imported in `server-only` modules; `check:secrets` scans the client bundle after every build.
- External links use `rel="noopener noreferrer"`. Error pages log on the server or console and never show error messages.
- `npm audit --audit-level=high` runs in `verify`.

---

## Deploying to Vercel with a hosted Supabase project

1. **Create a Supabase project** at [supabase.com](https://supabase.com). Note the project URL, the anon (publishable) key and the service role (secret) key.
2. **Push the schema** from your machine:
   ```bash
   supabase login
   supabase link --project-ref <your-project-ref>
   supabase db push                         # applies supabase/migrations
   psql "<connection string>" -f supabase/seed.sql   # once, for the initial products and drafts
   ```
   Delete the `internal-draft` test product afterwards if you like: `delete from products where slug = 'internal-draft';`
3. **Import the repo in Vercel.** Framework: Next.js. No build settings to change.
4. **Set environment variables** in Vercel (Production and Preview) from the table above. At minimum: `NEXT_PUBLIC_SITE_URL=https://agentix.website`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`, `REVALIDATE_SECRET`, and the SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`). Without SMTP the production server refuses requests, so quote emails can never be silently lost.
   - **Resend:** add and verify your domain in Resend (DNS records), create an API key, then use `smtp.resend.com`, port `465`, `SMTP_SECURE=true`, user `resend`, password = the API key, and `EMAIL_FROM=Agentix <quotes@agentix.website>`. Any other SMTP provider works the same way.
5. **Domains:** add `agentix.website` and `www.agentix.website`. Make the apex the primary domain and set `www` to redirect to it (301). The app also redirects `www` itself, as a fallback.
6. **Supabase URL settings** (Authentication → URL Configuration): set the Site URL to `https://agentix.website` and add it to the allowed redirect URLs. The site does not use Supabase Auth today, but this keeps future auth emails pointing to the right domain.
7. **Optional:** a Supabase Database Webhook on `posts` and `products` (insert/update) that POSTs to `https://agentix.website/api/revalidate` with the `x-revalidate-secret` header.
8. Deploy, then run through the post-launch checklist below.

Behind Vercel, the client IP for rate limiting comes from `x-real-ip`, which Vercel sets and visitors cannot spoof. If you self-host, set `TRUSTED_IP_HEADER` to the header your proxy overwrites.

## Google Search Console

1. Open [Search Console](https://search.google.com/search-console) and add a property:
   - **Domain property** (recommended): add the TXT record it shows to your DNS, or
   - **URL-prefix property** for `https://agentix.website`: choose the HTML tag method, copy the `content` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify.
2. Go to **Sitemaps** and submit `https://agentix.website/sitemap.xml`.
3. Use **URL Inspection** on the home page and a product page, and click **Request indexing**.
4. After a few days, check **Pages** (indexing), **Core Web Vitals** and **Enhancements** for errors.

## Bing Webmaster Tools

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Either **import your site from Google Search Console** (quickest), or add the site and verify with the meta tag: put the `msvalidate.01` value in `NEXT_PUBLIC_BING_SITE_VERIFICATION` and redeploy.
3. Submit `https://agentix.website/sitemap.xml` under **Sitemaps**.

## IndexNow (Bing, Yandex and others)

IndexNow tells participating search engines about new or changed URLs straight away.

1. Create a key: `openssl rand -hex 16`. Set it as `INDEXNOW_KEY` in Vercel and redeploy. Check that `https://agentix.website/indexnow-key.txt` shows the key.
2. Submit every sitemap URL: `INDEXNOW_KEY=<key> NEXT_PUBLIC_SITE_URL=https://agentix.website node scripts/indexnow.mjs`
3. After you change a page, submit just that page: `node scripts/indexnow.mjs /services/seo-geo /llms.txt` (same variables).

Google does not use IndexNow; use Search Console's URL Inspection for Google.

## GEO: AI answer engines

The site is set up so ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews can find, read and cite it:

- Every page is server-rendered HTML; no important text is only in JavaScript.
- `/llms.txt` and `/llms-full.txt` summarize the company, services, pricing, projects and contact details. They are generated from `src/content`, so they never drift from the pages.
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended and Applebot-Extended on public pages.
- Service and project pages open with a 40 to 60 word direct answer, then question-form headings, comparison tables and an FAQ (mirrored in FAQPage JSON-LD).
- One Organization and one Person (Ahtasham Naeem) appear in the JSON-LD of every page with the same name, description, contact details and service names.
- Every indexable page shows a "Last updated" date that matches the sitemap.

## Monthly GEO and SEO checklist

- [ ] Search Console: Pages report (new exclusions), Core Web Vitals, Enhancements (FAQ, breadcrumbs) and the Performance report. Rewrite titles and descriptions for pages with many impressions but few clicks.
- [ ] Bing Webmaster Tools: Site Explorer errors and the Search Performance report.
- [ ] Ask ChatGPT (search on), Perplexity, Gemini and Google (AI Overviews) the questions customers ask, for example "who builds WhatsApp booking chatbots in Pakistan" or "n8n automation services". Note whether Agentix is mentioned or cited and which page is used.
- [ ] Check server or Vercel logs for GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot visits; make sure none get 4xx or 5xx.
- [ ] Update one service or project page with a new fact, FAQ or comparison row, update its `updated` date, then run `node scripts/indexnow.mjs <path>`.
- [ ] Publish or refresh at least one blog post and link it from the related service page.
- [ ] Run `npm run test:seo` and `npm run test:lighthouse`; fix anything red.
- [ ] Confirm `/llms.txt`, `/robots.txt` and `/sitemap.xml` load and list every public page.
- [ ] Re-check prices in `src/content/pricing.ts` and the contact details; they feed the pages, FAQ, JSON-LD and llms.txt.

## Post-launch SEO checklist

- [ ] `https://agentix.website/robots.txt` and `/sitemap.xml` load and list the right pages.
- [ ] `https://www.agentix.website/` redirects to `https://agentix.website/` with a 301.
- [ ] Every page's canonical URL uses `https://agentix.website` (check `NEXT_PUBLIC_SITE_URL`).
- [ ] Sitemap submitted in Google Search Console and Bing Webmaster Tools.
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) passes for the home page, a service page, a product page and the contact page.
- [ ] Share a page on LinkedIn or WhatsApp and check the preview image and title.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) on mobile for `/`, `/products` and `/contact`.
- [ ] Contact email, phone and social URLs checked in the environment variables, and a test quote received by email.
- [ ] Fill the `TODO: confirm` items (see below), then mark Nexa AI and UpHex `indexable = true`.
- [ ] Review and publish the six draft blog posts, one or two per week.
- [ ] Link the site from your LinkedIn, GitHub and Upwork profiles (and a Google Business Profile if you create one).
- [ ] After 1–2 weeks, check indexing coverage in Search Console and fix any excluded pages.
- [ ] Each month, review the queries and pages report and update copy where pages rank but get few clicks.

## Content to confirm

- Nexa AI (text from its README) and UpHex (text from the owner's notes) stay `noindex` until ownership, role and details are confirmed.
- Exact scope on Meyamb; UI library on Nizame-Taleem (Bootstrap or Ant Design).
- What each pricing plan includes (`TODO: confirm inclusions` in `src/content/pricing.ts`) and the chatbot pricing message.
- Project screenshots: add files to `public/images/projects/` and list them in each project's `screenshots`.
- The contact email `ahtasham067@gmail.com` (double m), exactly as given.
- Upwork profile URL.
- Privacy and terms pages are placeholders for legal review.
- Six blog posts are drafts awaiting review.
