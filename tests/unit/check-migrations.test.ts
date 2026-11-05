import { describe, expect, it } from "vitest";
import {
  allowsDestructive,
  destructiveStatements,
  stripSqlComments,
} from "../../scripts/check-migrations.mjs";

describe("migration safety check", () => {
  it("flags drop table, drop column and truncate", () => {
    expect(destructiveStatements("DROP TABLE public.posts;")).toEqual(["drop table"]);
    expect(destructiveStatements("alter table x drop  column y;")).toEqual(["drop column"]);
    expect(destructiveStatements("truncate public.quotes;")).toEqual(["truncate"]);
  });

  it("allows additive and policy changes", () => {
    expect(destructiveStatements("alter table x add column y text;")).toEqual([]);
    expect(destructiveStatements('drop policy if exists "p" on public.quotes;')).toEqual([]);
    expect(destructiveStatements("comment on column public.quotes.notified is 'x';")).toEqual([]);
  });

  it("ignores words inside comments", () => {
    const sql = "-- never drop table here\n/* truncate */\nalter table x add column y text;";
    expect(stripSqlComments(sql)).not.toMatch(/drop table|truncate/);
    expect(destructiveStatements(sql)).toEqual([]);
  });

  it("is overridden only by [allow-destructive] in the PR title", () => {
    expect(allowsDestructive("Remove posts table [allow-destructive]")).toBe(true);
    expect(allowsDestructive("Remove posts table")).toBe(false);
    expect(allowsDestructive(undefined)).toBe(false);
  });
});
