-- Proves that deploy-db.yml applies new migrations to production (docs/CICD.md).
-- Sets the comment to the text it already has, so nothing changes.

comment on column public.quotes.notified is 'True once the owner notification email was sent (notified_at is set). False if it failed.';
