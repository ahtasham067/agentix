# CI/CD guide

How changes get from a branch to production, which checks guard `main`, and what to do when one fails. Setup of the services themselves is in [DEPLOYMENT.md](DEPLOYMENT.md).

## The pipeline

```text
 feature branch ──push──► pull request into main
                              │
                              ├── CI (.github/workflows/ci.yml)                    ┐
                              │     lint-typecheck   unit-tests   database         │
                              │     migration-safety build                         │ all must pass
                              │     e2e (desktop | mobile | cross-browser)         │
                              │     seo-geo   visual   lighthouse   security       │
                              │     └──► ci-gate (the one required check) ◄────────┘
                              ├── CodeQL (.github/workflows/codeql.yml)
                              └── Vercel Preview deployment (URL commented on the PR)
                              │
                     squash merge (only when ci-gate is green and the branch is up to date)
                              │
                              ▼
                            main ──┬──► Vercel Production deployment (Git integration)
                                   │        └──► deployment_status: success
                                   │               └──► smoke.yml: npm run test:smoke on production
                                   │                       └── fails? → GitHub issue with rollback steps
                                   └──► deploy-db.yml (only if supabase/migrations/** changed)
                                            link → list pending (dry run) → db push

 every night 02:30 PKT: nightly.yml → Supabase keep-alive + smoke + Lighthouse on production
 every Monday: Dependabot PRs (npm, GitHub Actions) + CodeQL weekly scan
```

## The checks

| Check | What it runs | Typical time |
| --- | --- | --- |
| `lint-typecheck` | `npm run lint` (ESLint, Prettier), `npm run typecheck` (`next typegen` + `tsc`) | 2 min |
| `unit-tests` | `npm run test:coverage` (Vitest), coverage summary in the run page | 2 min |
| `database` | local Supabase DB, `supabase db reset` (all migrations + seed from scratch), `supabase test db` (pgTAP and RLS), `supabase db diff` must be empty (no drift) | 3 min |
| `migration-safety` | `scripts/check-migrations.mjs`: blocks `drop table`, `drop column`, `truncate` in changed migrations unless the PR title has `[allow-destructive]` (PRs only) | <1 min |
| `build` | local Supabase + `next build`, uploads the build for the next jobs | 4 min |
| `e2e (desktop)`, `e2e (mobile)` | Playwright e2e suite against the production build, local Supabase and Mailpit | 5 min each |
| `e2e (cross-browser)` | `tests/smoke` in Chromium, WebKit and Firefox | 4 min |
| `seo-geo` | `npm run test:seo` (metadata, structured data, sitemap, robots, llms.txt, AI crawler rules) | 4 min |
| `visual` | `npm run test:visual`: pixel diff against `images/agentix-0*.png`, under 2% per page | 4 min |
| `lighthouse` | `npm run test:lighthouse` with `LH_RUNS=3` (median, applied throttling): SEO 100, performance 90+, accessibility 95+, best practices 90+ | 6 min |
| `security` | `npm audit --audit-level=high`, gitleaks on the new commits, dependency review (PRs), `check:secrets` on the client bundle | 3 min |
| `ci-gate` | passes only when every job above passed | <1 min |
| `codeql` | CodeQL security-extended queries (separate workflow) | 5 min |

The jobs run in parallel after `build`; a full run takes about 12 to 15 minutes. Third-party actions are pinned to full commit SHAs (the comment shows the version); Dependabot updates them.

## Branch protection

A repository ruleset on `main` (Settings → Rules → Rulesets → `main`):

- Pull request required before merging, 0 approvals (single developer), squash merge only.
- Required status check: `ci-gate`, and the branch must be up to date with `main`.
- Force pushes and branch deletion blocked; linear history required.
- No bypass list, not even for the owner.

Repository settings: squash merging only, "Automatically delete head branches" on.

The ruleset is kept in `.github/rulesets/main.json`. Recreate it with `gh api repos/ahtasham067/agentix/rulesets --method POST --input .github/rulesets/main.json`, or update the existing one with `--method PUT` on `rulesets/<id>`.

## Day-to-day work

```bash
git switch main && git pull
git switch -c feat/short-description
# change code, then locally:
npm run lint && npm run typecheck && npm test
git commit -m "Say what changed and why"
git push -u origin HEAD
gh pr create --fill            # or open the PR on GitHub
gh pr checks --watch           # wait for green
# open the Vercel preview URL from the PR comment and check the change
gh pr merge --squash --delete-branch
```

You cannot push to `main` directly; every change goes through a PR. If `main` moved while your PR was open, click "Update branch" (or `git pull --rebase origin main && git push --force-with-lease`) and wait for CI again.

After the merge, watch the production deploy: the Vercel dashboard (or `npx vercel ls agentix --prod`) and the "Production smoke test" run in the Actions tab.

## Adding a migration safely

The new frontend and `deploy-db` start at the same moment after a merge, and the old frontend keeps serving until the new one is live. So every migration must work with both the old and the new code:

1. **Add before you remove.** New columns are nullable or have a default. New tables and functions are fine.
2. **Use it in a second PR.** Merge the migration first, then the code that depends on it.
3. **Renames take two steps.** Add the new column and copy the data (PR 1), switch the code (PR 2), drop the old column later with `[allow-destructive]` (PR 3).
4. **Removing something** (`drop table`, `drop column`, `truncate`) is blocked by `migration-safety`. Only do it when no deployed code uses it, and put `[allow-destructive]` in the PR title.
5. **Never edit a migration that is already on `main`.** Write a new one.

Steps:

```bash
supabase migration new add_something        # creates supabase/migrations/<timestamp>_add_something.sql
npm run db:reset && npm run db:test         # applies everything from scratch locally
supabase db diff --schema public            # must be empty: the migration matches the database
```

Add pgTAP tests in `supabase/tests/` for new rules. After the merge, the "Deploy database" workflow prints the pending migrations and applies them; check its log, or run `supabase migration list --linked`.

## When a check fails

Open the failed job in the Actions tab; Playwright jobs upload a report with traces (`playwright-*` artifacts), `visual` uploads the diff images, `lighthouse` always uploads its reports.

| Check | Common cause | Fix |
| --- | --- | --- |
| `lint-typecheck` | formatting or lint error | `npx prettier --write .` and `npm run lint`, fix the rest by hand |
| `unit-tests` | changed behavior or copy | run `npm test` and update the code or the test |
| `database` | migration error, failing pgTAP test, or `db diff` not empty | `npm run db:reset && npm run db:test`; a non-empty diff means the schema was changed outside a migration: put the change in a migration |
| `migration-safety` | `drop`/`truncate` in a migration | make it additive, or add `[allow-destructive]` to the PR title when it is truly safe |
| `build` | type error, or content that no longer matches the seed | `npm run build`; after content changes run `npm run db:seed:gen` |
| `e2e` | broken page, changed copy, flaky timing | download the report, run `npx playwright show-trace <trace.zip>`, reproduce with `npm run test:e2e` |
| `visual` | layout or copy change on a compared page | look at the diff image; if the change is intended, the design PNG must be updated by the designer |
| `lighthouse` | slower page or bigger bundle | open the report artifact, look at total blocking time and the largest scripts |
| `security` | vulnerable dependency, leaked secret, server secret in the client bundle | `npm audit fix` or update the package; for a leaked secret rotate it first (DEPLOYMENT.md, section 9), then remove it |
| `ci-gate` | one of the jobs above failed or was cancelled | fix that job |
| smoke test issue | production broken after a deploy | roll back (below), then fix in a PR |
| no smoke run after a deploy | Vercel is not reporting deployments to GitHub | see step 5 of "Connect GitHub to Vercel" in `docs/DEPLOYMENT.md` |

## Rollback

Frontend: `npx vercel rollback <last-good-deployment-url> --yes`, then after the fix `npx vercel promote <new-deployment-url> --yes`. Database: write a forward-fix migration. Details in [DEPLOYMENT.md](DEPLOYMENT.md#10-rollback).

## Secrets used by the workflows

- Environment `production` (deployments from `main` only): `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID`, `SUPABASE_DB_PASSWORD`.
- Repository: `SMOKE_TEST_TOKEN`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`; variable `PRODUCTION_URL`.

Workflows never print them. CI jobs use the local Supabase demo keys, not production keys.

## Costs and limits

- The repository is public, so GitHub Actions minutes, CodeQL and dependency review are free.
- GitHub turns off scheduled workflows after 60 days without commits; the nightly check stops then. Re-enable it in the Actions tab.
- Supabase Free pauses a project after 7 days without activity; the nightly keep-alive prevents that.
- Vercel Hobby is for non-commercial use. For a business site, move the project to Vercel Pro.
