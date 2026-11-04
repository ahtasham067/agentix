#!/usr/bin/env bash
# Opens (or comments on) one GitHub issue per failing check, with rollback steps.
# Usage: report-failure.sh "<title>" ; needs GH_TOKEN, GITHUB_REPOSITORY, GITHUB_SERVER_URL, GITHUB_RUN_ID.
set -euo pipefail
title="$1"
run_url="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
body=$(cat <<BODY
**$title**

Run: $run_url
Commit: ${DEPLOY_SHA:-$GITHUB_SHA}

### Roll back the frontend (Vercel)
1. \`npx vercel ls agentix --prod\` and find the last good production deployment.
2. \`npx vercel rollback <deployment-url>\`, or in the dashboard: Deployments, then the last good one, then "Instant Rollback".
3. After the fix is merged, \`npx vercel promote <new-deployment-url>\` to turn automatic production deploys back on.

### Database
Migrations are not rolled back automatically. Write a forward-fix migration in a new PR
(see "Rollback" in docs/DEPLOYMENT.md).
BODY
)
existing=$(gh issue list --repo "$GITHUB_REPOSITORY" --state open --search "\"$title\" in:title" --json number --jq '.[0].number // empty')
if [ -n "$existing" ]; then
  gh issue comment "$existing" --repo "$GITHUB_REPOSITORY" --body "$body"
else
  gh issue create --repo "$GITHUB_REPOSITORY" --title "$title" --body "$body"
fi
