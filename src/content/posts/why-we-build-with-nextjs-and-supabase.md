---
title: Why we build web apps with Next.js and Supabase
seoTitle: Why We Build Web Apps with Next.js and Supabase | Agentix
description: Why Agentix builds most new web apps with Next.js and Supabase, how the two fit together securely, and when we choose Ruby on Rails instead.
relatedServices: web-apps
---

Every web app needs the same basic parts: pages that load fast, a database, user accounts, and rules about who can see what. For most new projects, we build these with Next.js and Supabase. This article explains why, how the two fit together, and when we pick something else.

## What we build

Our web apps are usually one of these:

- Dashboards around AI agents and workflows, such as the [CliniDesk](/products/clinidesk) clinic dashboard
- Internal tools that replace shared spreadsheets
- Customer portals where clients see their own data
- Online stores with payments

They share a few needs. They must be fast on a phone, secure by default, easy to change, and cheap to run while traffic is modest.

## Why Next.js

Next.js is a framework built on React. Three things make it our default for the front end.

### Pages are rendered on the server

Next.js can render pages on the server and send finished HTML to the browser. Pages appear quickly, even on slow phones, and search engines can read the content without running JavaScript. For marketing pages and public product pages, that is a big advantage.

### Data stays on the server

With server components and server actions, much of the work that touches the database happens on the server. Secret keys never reach the browser, and the amount of JavaScript sent to users stays smaller.

### One codebase for the whole app

The same project holds the public pages, the logged-in dashboard and the server logic. That keeps small projects simple. We deploy to Vercel or AWS, with automatic previews for every change.

## Why Supabase

Supabase is a backend built around PostgreSQL. It gives us several pieces we would otherwise assemble by hand.

### A real Postgres database

Under Supabase is plain PostgreSQL, a database that has been reliable for decades. Your data is in standard tables you can query, back up and move. You are not locked into a proprietary format.

### Authentication

Supabase includes user sign-up, sign-in, password reset and social logins. That removes a lot of security-sensitive code we would otherwise write ourselves.

### Row level security

This is the feature we rely on most. Row level security lets the database itself decide which rows each user may read or change. Even if a mistake slipped into the app code, the database would still refuse to show one customer's data to another. On this very website, for example, the public can read published products but cannot read quote requests at all.

### Local development

The Supabase CLI runs the whole stack locally in Docker. We write database changes as migrations, test the security rules with automated tests, and push the same migrations to production. Nothing is changed by hand in a live database.

## How the two fit together

In a typical app:

1. Public pages read published data from Supabase with a limited key, and row level security filters what that key can see.
2. Forms submit to server actions in Next.js, which validate the input before saving it.
3. Anything that needs full access runs only on the server, with a key that never reaches the browser.
4. Pages that rarely change are cached, so most visitors get a static page that loads instantly.

This setup is fast, and it is secure in layers: the browser, the server and the database each check what is allowed.

## Performance and search

Speed and search visibility often decide whether a web app succeeds, especially for anything public. Because Next.js sends finished HTML, content appears before the JavaScript has loaded, and search engines can read every page. Images can be resized automatically, fonts load without shifting the layout, and pages that rarely change are served from a cache close to the visitor.

For logged-in dashboards, the same server rendering means less work for the user's phone or laptop, which keeps the app responsive on older devices.

## Costs while you are small

Both Next.js hosting and Supabase scale from very small projects to large ones. You start on a modest setup and pay more only as usage grows, instead of paying for servers you do not yet need. Because the database is standard PostgreSQL and the app is standard Next.js, you can also move to other hosting later without rewriting the app.

## When we choose Ruby on Rails instead

We have built many apps in Ruby on Rails, and it is still the better choice for some projects:

- Large back ends with many background jobs, where Rails with Sidekiq and Redis is proven
- Complex business logic that benefits from Rails conventions
- Existing Rails apps, where rewriting would add cost without benefit

Projects like the Meyamb fintech platform and the AutoBuffy store run on Rails back ends. The front end can still be React, Vue.js or Next.js.

## The trade-offs

No stack is perfect. Supabase works best when you are comfortable with SQL and with designing security rules carefully. Next.js changes often, so projects need regular updates. Both are manageable, and the benefits outweigh them for the apps we build.

## Want a web app like this?

Our [Next.js web app development](/services/web-apps) service covers the whole stack: database design, security rules, the interface, payments and deployment. If your app sits next to an AI agent or an automation, we can build those too, so you work with one team. [Tell us what your app should do](/contact) and we will reply with a plan, a timeline and a price.

## Key points

- Next.js gives fast, server-rendered pages and keeps secrets on the server.
- Supabase gives a real Postgres database, authentication and row level security.
- Together they make apps that are fast, secure in layers and easy to change.
- For large back ends with many background jobs, we still choose Ruby on Rails.
