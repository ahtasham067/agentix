# Agentix

Website for **Agentix** (agentix.website), a software house building AI agents, n8n automation and web apps.

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
npm run db:start                  # local Supabase in Docker (ports 57320-57329)
npm run db:reset                  # apply migrations and seed
npm run db:env                    # write local Supabase URL and keys to .env.local
npm run dev                       # http://localhost:3000
```

`npm run db:env` keeps any other values already in `.env.local`, and creates a random `IP_HASH_SALT` the first time.

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
| `RESEND_ENABLED`, `RESEND_API_KEY`, `QUOTE_NOTIFY_TO`, `QUOTE_NOTIFY_FROM` | server | Optional email for new quotes via Resend. The site works without it. |
| `REVALIDATE_SECRET` | server | Secret for `POST /api/revalidate` (refresh cached posts/products after editing in Supabase). |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | build | Contact details shown on the site. Defaults are the design placeholders. |
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
| `test:e2e` | Playwright on desktop (1440px) and mobile (Pixel 7): routes, links, filters, quote form, honeypot, rate limit, 404, axe |
| `test:visual` | Full-page screenshots at 1440px compared with `images/*.png` (pixelmatch, must be under 2%) |
| `test:seo` | Titles, descriptions, canonicals, OG, JSON-LD, word counts, heading order, sitemap, robots, link crawler, `www` redirect |
| `test:lighthouse` | Lighthouse mobile, median of 5 runs, on `/`, `/products`, `/services`, `/products/clinidesk`, `/contact`. Needs performance 90, accessibility 95, best practices 90, SEO 100 |
| `db:start`, `db:stop`, `db:reset`, `db:test` | Supabase local stack, reset with seed, pgTAP tests |
| `db:env`, `db:types`, `db:seed:gen` | Write `.env.local`, generate DB types, generate `seed.sql` |
| `audit` | `npm audit --audit-level=high` |
| `verify` | Everything above, in order |

`test:e2e`, `test:visual` and `test:seo` start `next start` on port 3000 from the last `npm run build`, so build first and stop any dev server on that port. They need the local database (`npm run db:reset`) and `.env.local`.

Visual results (diff PNGs and `report.json`) are written to `test-results/visual/`, Lighthouse reports to `test-results/lighthouse/`.

> Lighthouse simulates a mid-tier phone by slowing your CPU down. Its default 4x slowdown is calibrated for a high-end desktop, so on a slower machine it over-throttles. Following Lighthouse's [throttling guide](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md#calibrating-multipliers), the runner reads your machine's `benchmarkIndex` and uses 4x on a high-end desktop (1500+), 2x on a low-end desktop (800–1500) and 1x below that. The table shows the multiplier it used. Run `LH_CPU_MULTIPLIER=4 npm run test:lighthouse` for the strict default. Scores still depend on how busy the machine is, so close heavy apps first. After launch, [PageSpeed Insights](https://pagespeed.web.dev/) gives the reference numbers.

## Security

- Content-Security-Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy` are set in `next.config.ts`.
- RLS on every table: the public can read published products and posts only. `quotes` allows anonymous insert of the form columns only; nobody can read, update or delete quotes without the service role.
- The quote form validates with zod on the client and the server, trims and length-limits input, has a honeypot, and rate-limits by a salted IP hash stored in the database.
- The service role key is only imported in `server-only` modules.
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
4. **Set environment variables** in Vercel (Production and Preview) from the table above. At minimum: `NEXT_PUBLIC_SITE_URL=https://agentix.website`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`, `REVALIDATE_SECRET`, and your real contact email and phone.
5. **Domains:** add `agentix.website` and `www.agentix.website`. Make the apex the primary domain and set `www` to redirect to it (301). The app also redirects `www` itself, as a fallback.
6. **Supabase URL settings** (Authentication → URL Configuration): set the Site URL to `https://agentix.website` and add it to the allowed redirect URLs. The site does not use Supabase Auth today, but this keeps future auth emails pointing to the right domain.
7. **Optional:** a Supabase Database Webhook on `posts` and `products` (insert/update) that POSTs to `https://agentix.website/api/revalidate` with the `x-revalidate-secret` header.
8. Deploy, then run through the post-launch checklist below.

Behind Vercel, the client IP for rate limiting comes from `x-forwarded-for`, which Vercel sets. If you self-host, make sure your proxy overwrites that header.

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

## Post-launch SEO checklist

- [ ] `https://agentix.website/robots.txt` and `/sitemap.xml` load and list the right pages.
- [ ] `https://www.agentix.website/` redirects to `https://agentix.website/` with a 301.
- [ ] Every page's canonical URL uses `https://agentix.website` (check `NEXT_PUBLIC_SITE_URL`).
- [ ] Sitemap submitted in Google Search Console and Bing Webmaster Tools.
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) passes for the home page, a service page, a product page and the contact page.
- [ ] Share a page on LinkedIn or WhatsApp and check the preview image and title.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) on mobile for `/`, `/products` and `/contact`.
- [ ] Real contact email, phone and social URLs set in the environment variables.
- [ ] Fill the `TODO: confirm` items (see below), then mark Nexa AI and UpHex `indexable = true`.
- [ ] Review and publish the six draft blog posts, one or two per week.
- [ ] Link the site from your LinkedIn, GitHub and Upwork profiles (and a Google Business Profile if you create one).
- [ ] After 1–2 weeks, check indexing coverage in Search Console and fix any excluded pages.
- [ ] Each month, review the queries and pages report and update copy where pages rank but get few clicks.

## Content to confirm

- "20+ projects delivered": the owner's CV says 12+.
- Nexa AI and UpHex have placeholder copy; their pages are `noindex` until filled in.
- Owner and role for Nizame-Taleem and Research Buddy; exact scope on Meyamb.
- Upwork profile URL.
- Privacy and terms pages are placeholders for legal review.
- Six blog posts are drafts awaiting review.
