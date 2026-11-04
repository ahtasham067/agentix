# Deployment guide

How Agentix runs in production and how to set it up again from nothing. No secrets are in this file; it only says where each one lives.

| Part | Where | Value |
| --- | --- | --- |
| Frontend | Vercel, Hobby plan, project `agentix` (team `ahtasham067-4615s-projects`) | https://agentix-ahtasham.vercel.app (later https://agentix.website) |
| Functions region | Vercel `bom1` (Mumbai), set in `vercel.json` | |
| Database | Supabase project `agentix`, ref `ktcadrojhcsrcrnvscaw`, region `ap-south-1` (Mumbai) | https://ktcadrojhcsrcrnvscaw.supabase.co |
| Email | Resend HTTP API | sender `onboarding@resend.dev` until the domain is verified |
| Code and CI | GitHub `ahtasham067/agentix` (public) | see [CICD.md](CICD.md) |

Mumbai is the closest Supabase and Vercel region to Pakistan.

## 1. Prerequisites

- Node.js 22 and npm, Docker (for local Supabase), Git with SSH access to GitHub.
- Accounts: GitHub, Vercel, Supabase, Resend.
- CLIs: `gh` (logged in), `supabase` (2.115 or newer, `supabase login`), Vercel through `npx vercel` (`npx vercel login`).
- A password manager for the secrets listed in section 4.

## 2. Create the Supabase project

1. `supabase login`, then find your organization id with `supabase orgs list`.
2. Generate a database password and keep it in your password manager:
   `openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 32`
3. Create the project in Mumbai:
   ```bash
   supabase projects create agentix --org-id <org-id> --region ap-south-1 --db-password '<password>'
   ```
4. Put the new ref in `supabase/config.toml` under `[remotes.production] project_id`.

## 3. Link and push the database

```bash
supabase link --project-ref <ref> --password '<db password>'
supabase db push --linked --dry-run --password '<db password>'   # shows what will run
supabase db push --linked --password '<db password>'             # applies the migrations
supabase config push                                              # Auth settings from [remotes.production]
```

Load the products once (published products only, safe to run twice):

```bash
npm run db:seed:gen                       # regenerates supabase/seed.sql and seed.production.sql
PGPASSWORD='<db password>' psql "$(sed -E 's#://([^:@]+)(:[^@]*)?@#://\1@#' supabase/.temp/pooler-url)?sslmode=require" \
  -v ON_ERROR_STOP=1 -f supabase/seed.production.sql
```

Never load `supabase/seed.sql` into production: it contains the `internal-draft` test row.

**Check the security rules** with the publishable (anon) key, for example with `curl -H "apikey: <publishable key>"`:

- `GET /rest/v1/products?select=slug` returns the 8 published products only.
- `GET /rest/v1/quotes`, `POST /rest/v1/quotes` and `POST /rest/v1/rpc/submit_quote` return 401 (permission denied).

**Auth** (`supabase config push` applies it): Site URL `https://agentix.website`, redirect URLs for production and Vercel previews only, and sign-ups (email, anonymous, MFA) off. The site has no user accounts; only the server uses the database, with the secret key.

## 4. Environment variables

### Vercel (Production and Preview)

Set them in Vercel → Project → Settings → Environment Variables, or with `printf '%s' "<value>" | npx vercel env add NAME production --sensitive --yes` (repeat for `preview`). Mark secrets **Sensitive**. Never give a secret a `NEXT_PUBLIC_` prefix: those values are sent to every browser.

| Name | Used by | Secret? | Where to get it |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, sitemap, Open Graph, CSP | public | `https://agentix-ahtasham.vercel.app`, then `https://agentix.website` once DNS works |
| `SUPABASE_URL` | server | public | `https://<ref>.supabase.co` |
| `SUPABASE_ANON_KEY` | server reads of published products | low (RLS protects data) | Supabase → Project Settings → API Keys → publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | quote form (server only) | **secret** | Supabase → API Keys → secret key (`supabase projects api-keys --reveal`) |
| `IP_HASH_SALT` | rate limiting | **secret** | `openssl rand -hex 24` |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MINUTES` | rate limiting | public | `3` and `10` |
| `TRUSTED_IP_HEADER` | rate limiting | public | `x-real-ip` (set by Vercel) |
| `EMAIL_PROVIDER` | quote emails | public | `resend` (or `smtp`) |
| `RESEND_API_KEY` | quote emails | **secret** | Resend → API Keys (Sending access) |
| `EMAIL_FROM` | quote emails | public | `Agentix <onboarding@resend.dev>`, later `Agentix <quotes@agentix.website>` |
| `EMAIL_TO` | owner inbox | public | `ahtasham067@gmail.com` |
| `QUOTE_CONFIRMATION_ENABLED` | visitor confirmation email | public | `false` until the domain is verified in Resend |
| `SMOKE_TEST_TOKEN` | post-deploy smoke test | **secret** | `openssl rand -hex 24` (same value as the GitHub secret) |
| `REVALIDATE_SECRET` | `POST /api/revalidate` | **secret** | `openssl rand -hex 32` |
| `INDEXNOW_KEY` | `/indexnow-key.txt` | public by design | `openssl rand -hex 16` |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | footer, contact page, JSON-LD | public | contact details |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_UPWORK_URL` | footer, JSON-LD | public | your profiles (Upwork still empty) |
| `NEXT_PUBLIC_ANALYTICS` | analytics | public | `off`, `plausible` or `ga4` |

Preview deployments use the same production database and the same email settings. Vercel Authentication protects previews, so only you can open them; a quote sent from a preview is a real quote.

After changing a variable, redeploy (Vercel → Deployments → Redeploy) so the new value is used. `NEXT_PUBLIC_` values are built into the page, so they always need a redeploy.

### GitHub (Settings → Secrets and variables → Actions)

| Name | Kind | Scope | Used by | Where to get it |
| --- | --- | --- | --- | --- |
| `SUPABASE_ACCESS_TOKEN` | secret | Environment `production` | `deploy-db.yml` | Supabase → Account → Access Tokens |
| `SUPABASE_PROJECT_ID` | secret | Environment `production` | `deploy-db.yml` | the project ref |
| `SUPABASE_DB_PASSWORD` | secret | Environment `production` | `deploy-db.yml` | your password manager |
| `SMOKE_TEST_TOKEN` | secret | repository | `smoke.yml`, `nightly.yml` | same value as in Vercel |
| `SUPABASE_URL` | secret | repository | `nightly.yml` keep-alive | `https://<ref>.supabase.co` |
| `SUPABASE_ANON_KEY` | secret | repository | `nightly.yml` keep-alive | publishable key |
| `PRODUCTION_URL` | variable | repository | `smoke.yml`, `nightly.yml` | `https://agentix-ahtasham.vercel.app` (later `https://agentix.website`) |

The `production` environment only allows deployments from `main` (Settings → Environments → production → Deployment branches).

## 5. Connect GitHub to Vercel

1. Vercel → Project `agentix` → Settings → Git → Connect Git Repository → GitHub → `ahtasham067/agentix`. If the repo is not listed, open github.com → Settings → Applications → Vercel → Configure, and give it access to the repo.
2. Production branch: `main`. Every other branch and every pull request gets a Preview deployment, and Vercel comments the preview URL on the PR.
3. Settings → Build and Deployment: framework Next.js, Node.js 22.x, default build and install commands.
4. Settings → Deployment Protection: Vercel Authentication for previews (production stays public).

## 6. Domain and DNS

The domain `agentix.website` must be registered first. Vercel already has `agentix.website` (production) and `www.agentix.website` (301 to the apex) on the project. At your registrar, add:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` (agentix.website) | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `b31afda99635fa5f.vercel-dns-017.com.` |

Remove any other A, AAAA or CNAME records on `@` and `www`. Vercel issues the HTTPS certificate on its own once DNS resolves (minutes to a few hours). Check with `npx vercel domains inspect agentix.website`.

Then:

1. Set `NEXT_PUBLIC_SITE_URL=https://agentix.website` in Vercel (Production and Preview) and the GitHub variable `PRODUCTION_URL=https://agentix.website`, and redeploy.
2. Check HTTPS and HSTS: `curl -sI https://agentix.website | grep -i strict-transport` must show `max-age=63072000; includeSubDomains; preload`.
3. Run the smoke test against the domain: `SMOKE_BASE_URL=https://agentix.website SMOKE_TEST_TOKEN=<token> npm run test:smoke`. Now the www and http redirect checks run too.
4. Optional, once everything is stable: submit the domain at https://hstspreload.org.

## 7. Email with Resend

Quote notifications go to `EMAIL_TO` through the Resend API (`src/lib/email/providers/resend.ts`). Until a domain is verified, Resend only delivers mail from `onboarding@resend.dev` to the address of your own Resend account, which is enough for owner notifications. Visitor confirmations stay off (`QUOTE_CONFIRMATION_ENABLED=false`).

To verify the domain (after it is registered):

1. Resend → Domains → Add Domain → `agentix.website`.
2. Add the records Resend shows at your registrar: an MX and a TXT (SPF, `v=spf1 include:amazonses.com ~all`) on `send`, a TXT (DKIM) on `resend._domainkey`, and optionally `_dmarc` TXT `v=DMARC1; p=none;`. Copy the exact values from Resend.
3. Click Verify DNS Records until the domain shows Verified.
4. In Vercel set `EMAIL_FROM=Agentix <quotes@agentix.website>` and `QUOTE_CONFIRMATION_ENABLED=true`, redeploy, and run `npm run email:test` locally with the same values.

## 8. Content

Products live in `src/content/projects/*.ts`. Change the file, run `npm run db:seed:gen`, and open a PR. The production seed only inserts new slugs; to change an existing product in production, edit the row in the Supabase table editor, then call `POST /api/revalidate` with the `x-revalidate-secret` header, or redeploy.

The blog was removed on 2026-11-04. The `posts` table is still in the database and empty; there is nothing to publish.

## 9. Rotate keys

Rotate a key when it may have leaked, and once a year anyway. Always: create the new value, update every place it is used, redeploy, then revoke the old one.

| Key | Steps |
| --- | --- |
| Supabase secret key | Supabase → API Keys → create a new secret key → update `SUPABASE_SERVICE_ROLE_KEY` in Vercel → redeploy → delete the old key. |
| Supabase publishable key | Same, for `SUPABASE_ANON_KEY` in Vercel and the GitHub secret. |
| Database password | Supabase → Database → Settings → Reset password → update `SUPABASE_DB_PASSWORD` in the GitHub `production` environment and your password manager. |
| Supabase access token | Create a new token → update the GitHub secret → revoke the old token. |
| Resend API key | Create a new key → update `RESEND_API_KEY` in Vercel and `.env.local` → redeploy → `npm run email:test` → delete the old key. |
| `SMOKE_TEST_TOKEN`, `REVALIDATE_SECRET`, `IP_HASH_SALT` | `openssl rand -hex 24`, update Vercel (and GitHub for the smoke token), redeploy. A new `IP_HASH_SALT` only resets the rate limit windows. |

## 10. Rollback

**Frontend (Vercel).** Production keeps every earlier deployment.

```bash
npx vercel ls agentix --prod                 # find the last good deployment
npx vercel rollback <deployment-url> --yes   # instant, no rebuild
```

Or in the dashboard: Deployments → the last good one → Instant Rollback. While rolled back, new merges build but do not go live. After the fix is merged and checked, promote the new deployment: `npx vercel promote <new-deployment-url> --yes`. That also turns automatic production deploys back on.

**Database.** Migrations are not undone automatically, and backups and point-in-time recovery are paid Supabase features. Fix forward: write a new migration that restores the previous state, open a PR, merge. That is why every migration must be backward compatible (see [CICD.md](CICD.md#adding-a-migration-safely)). For data loss, restore from your own `supabase db dump` exports (see the monthly checklist).

## 11. Monthly maintenance checklist

- [ ] Merge the Dependabot PRs once CI is green; read the release notes of any major update first.
- [ ] Check the Nightly production check runs and close fixed issues.
- [ ] `npx vercel ls agentix --prod`: the latest production deployment is from `main` and Ready.
- [ ] Supabase dashboard: project healthy, database size and egress well under the Free plan limits.
- [ ] Back up the database: `supabase db dump --linked -f backup-$(date +%F).sql` and `supabase db dump --linked --data-only -f data-$(date +%F).sql`; keep them outside the repo.
- [ ] Resend dashboard: no bounces or failures; check the monthly quota.
- [ ] Send a test quote on the live site and check the email arrives; delete the test row.
- [ ] Look at Search Console and Bing Webmaster Tools for errors (once the domain is live).
- [ ] Rotate any key older than a year (section 9).
- [ ] The scheduled workflows still run: GitHub turns them off after 60 days without commits.
