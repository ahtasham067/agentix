-- GENERATED FILE. Do not edit by hand.
-- Source: src/content/projects/*.ts and src/content/posts/*.md (posts start as drafts).
-- Regenerate with: npm run db:seed:gen

insert into public.products (
  slug,
  name,
  summary,
  description,
  tagline,
  tags,
  stack,
  category,
  thumbnail,
  website_url,
  role,
  audience,
  client_work,
  facts,
  features,
  steps,
  sections,
  faqs,
  screenshots,
  screens,
  built_with,
  related_services,
  related_projects,
  seo_title,
  seo_description,
  primary_keyword,
  indexable,
  featured,
  sort_order,
  published
) values
  (
    'clinidesk',
    'CliniDesk',
    'Doctor appointments on WhatsApp. Patients book in chat, and doctors manage appointments and patient history from a dashboard.',
    'Patients book in a WhatsApp chat. Doctors manage appointments and patient history from one dashboard.',
    'Doctor appointments on WhatsApp.',
    array['AI agent', 'n8n', 'Next.js', 'Supabase']::text[],
    'Next.js, Supabase, n8n',
    'ai-agents',
    'clinidesk',
    'https://clinidesk.online',
    'Built the WhatsApp AI agent, the n8n workflows and the dashboard',
    'Clinics, hospitals and doctors',
    false,
    '[{"label":"Type","value":"AI agent and web app"},{"label":"Channel","value":"WhatsApp"},{"label":"Stack","value":"Next.js, Supabase, n8n"},{"label":"Plan","value":"Monthly subscription"}]'::jsonb,
    '[{"icon":"chat","title":"Booking on WhatsApp","text":"Patients message the clinic and book without installing anything."},{"icon":"bot","title":"AI agent","text":"An n8n agent understands the request and replies in seconds."},{"icon":"calendar","title":"Doctor dashboard","text":"Doctors see and manage all appointments in one place."},{"icon":"clock","title":"Patient history","text":"Every visit is saved against the patient for quick reference."}]'::jsonb,
    '[{"title":"Patient messages","text":"They write to the clinic on WhatsApp."},{"title":"Agent books","text":"The AI agent finds a free slot and confirms it."},{"title":"Doctor sees it","text":"The appointment appears on the dashboard with history."}]'::jsonb,
    '[{"heading":"A WhatsApp doctor appointment system for clinics","paragraphs":["Most patients already use WhatsApp every day. CliniDesk lets them book a doctor''s appointment in that same chat, at any hour, without installing an app or waiting on the phone.","Booking by hand keeps the front desk busy and can put two patients in the same slot. CliniDesk works as a 24/7 WhatsApp AI receptionist: it takes the booking work off the desk and keeps every appointment in one place."]},{"heading":"How the WhatsApp AI receptionist works","paragraphs":["Patients can book, reschedule or cancel an appointment in Urdu, Roman Urdu or English. They can type their message or send a voice note.","Before it offers a time, the n8n agent checks each doctor''s real availability. That is how CliniDesk prevents double bookings. When the patient confirms, the booking syncs to a live dashboard straight away."]},{"heading":"What clinic staff get","paragraphs":["The dashboard is built with Next.js and Supabase. The chat runs on the WhatsApp Business Cloud API, and n8n runs the agent workflow behind it."],"bullets":["Hospital and doctor appointments in one view","Patient visit history, saved against each patient","Doctor schedules","Booking analytics","Staff roles for your team"]}]'::jsonb,
    '[{"question":"Which languages does CliniDesk understand?","answer":"Patients can write in Urdu, Roman Urdu or English. They can also send a voice note instead of typing."},{"question":"Can patients reschedule or cancel on WhatsApp?","answer":"Yes. Patients can book, reschedule and cancel appointments in the same WhatsApp chat."},{"question":"How does CliniDesk prevent double bookings?","answer":"The n8n agent checks each doctor''s real availability before it offers a slot. Every confirmed booking syncs to the dashboard right away, so a taken slot is not offered again."},{"question":"What does the clinic dashboard show?","answer":"Hospital and doctor appointments, patient visit history, analytics, staff roles and doctor schedules."},{"question":"Do patients need to install an app?","answer":"No. Patients book in WhatsApp, which they already have on their phone."},{"question":"How is CliniDesk priced?","answer":"CliniDesk is offered as a monthly subscription. See clinidesk.online for details, or ask us for a quote if you need a booking agent built for your own business."}]'::jsonb,
    '[]'::jsonb,
    array['calendar', 'patient-history']::text[],
    array['Next.js', 'Supabase', 'n8n', 'WhatsApp Cloud API', 'OpenAI']::text[],
    array['ai-agents', 'n8n-automation', 'web-apps']::text[],
    array['nexa-ai', 'nizame-taleem', 'meyamb']::text[],
    'WhatsApp Doctor Appointment System – CliniDesk | Agentix',
    'CliniDesk is a WhatsApp doctor appointment system: an AI receptionist books patients 24/7 in Urdu, Roman Urdu or English and syncs a clinic dashboard.',
    'WhatsApp doctor appointment system',
    true,
    true,
    1,
    true
  ),
  (
    'nexa-ai',
    'Nexa AI',
    'An AI assistant project built in-house by the Agentix team.',
    'An AI assistant project built in-house by the Agentix team.',
    null,
    array['AI agent']::text[],
    'AI',
    'ai-agents',
    'nexa-ai',
    null,
    null,
    null,
    false,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    '{}'::text[],
    array['ai-agents']::text[],
    array['clinidesk']::text[],
    'Nexa AI: AI Assistant Built In-House | Agentix',
    'Nexa AI is an AI assistant project built in-house by the Agentix team. Full details are coming soon; ask us about custom AI agents for your business.',
    'in-house AI assistant',
    false,
    false,
    2,
    true
  ),
  (
    'autobuffy',
    'AutoBuffy',
    'An online auto parts store with secure payments and a Rails API backend.',
    'An online auto parts store with secure payments and a Rails API backend. Shoppers search a catalog of more than 1.2 million parts by vehicle fitment.',
    'Auto parts e-commerce with vehicle-fitment search.',
    array['Web app', 'Rails', 'Payments']::text[],
    'Ruby on Rails',
    'web-apps',
    'autobuffy',
    null,
    'RESTful APIs, payments, analytics, database optimization and deployments',
    'Online auto parts shoppers',
    true,
    '[{"label":"Type","value":"E-commerce web app"},{"label":"Industry","value":"Auto parts"},{"label":"Stack","value":"Ruby on Rails"},{"label":"Our role","value":"APIs, payments, deployments"}]'::jsonb,
    '[{"icon":"search","title":"Vehicle-fitment search","text":"Shoppers find parts that fit their vehicle in a catalog of 1.2M+ parts."},{"icon":"code","title":"RESTful APIs","text":"A Ruby on Rails API backend serves the store."},{"icon":"card","title":"Flexible payments","text":"PayPal, Apple Pay, Afterpay and Klarna at checkout."},{"icon":"chart","title":"Analytics and tuning","text":"Analytics integration and database optimization for a large catalog."}]'::jsonb,
    '[]'::jsonb,
    '[{"heading":"An auto parts e-commerce platform at catalog scale","paragraphs":["AutoBuffy is an online auto parts store. Its catalog holds more than 1.2 million parts, and shoppers use vehicle-fitment search to find the parts that fit their vehicle.","A store of this size needs an API backend that stays fast as the catalog grows, and a checkout that offers the payment methods people already use."]},{"heading":"Our role on AutoBuffy","paragraphs":["AutoBuffy is client work. Agentix founder Ahtasham Naeem worked on the backend and the checkout:"],"bullets":["Built RESTful APIs in Ruby on Rails","Integrated PayPal, Apple Pay, Afterpay and Klarna","Integrated analytics","Optimized the database","Handled releases and deployments"]},{"heading":"What vehicle-fitment search means for a parts store","paragraphs":["In auto parts e-commerce, the hard question is not price but fit. A brake pad or filter that suits one model year can be wrong for the next. Fitment search starts from the shopper''s vehicle, usually its year, make and model, and only then shows the parts that match it.","That changes how the back end has to work. Every search filters a very large catalog by compatibility, so queries must stay fast and the data must stay consistent. It is also why a store like this needs careful database work as the catalog grows, which was part of our role on AutoBuffy."]},{"heading":"Payments shoppers expect","paragraphs":["Car parts can be expensive, so payment choice matters at checkout. AutoBuffy offers PayPal and Apple Pay for speed, and Afterpay and Klarna for shoppers who prefer to split a larger order into instalments."]}]'::jsonb,
    '[{"question":"What did Agentix work on for AutoBuffy?","answer":"Agentix founder Ahtasham Naeem built the RESTful APIs in Ruby on Rails, integrated payments and analytics, optimized the database and handled deployments."},{"question":"Which payment methods does AutoBuffy support?","answer":"PayPal, Apple Pay, Afterpay and Klarna."},{"question":"What is vehicle-fitment search?","answer":"It lets shoppers choose their vehicle and see the parts that fit it. In a catalog of more than 1.2 million parts, it helps people avoid ordering a part that does not fit."},{"question":"Can you build a similar online store?","answer":"Yes. We build e-commerce web apps with Ruby on Rails or Next.js, including payment integrations. See our web app development service or ask for a quote."}]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    array['Ruby on Rails', 'RESTful APIs', 'PayPal', 'Apple Pay', 'Afterpay', 'Klarna']::text[],
    array['web-apps']::text[],
    array['meyamb', 'research-buddy', 'nizame-taleem']::text[],
    'Auto Parts E-Commerce Platform – AutoBuffy | Agentix',
    'AutoBuffy is an auto parts e-commerce platform with vehicle-fitment search across 1.2M+ parts, Rails APIs and PayPal, Apple Pay and Klarna checkout.',
    'auto parts e-commerce platform',
    true,
    false,
    3,
    true
  ),
  (
    'meyamb',
    'Meyamb',
    'A fintech web app built with Ruby on Rails and Vue.js.',
    'A cross-border fintech platform for the Central African diaspora, with a virtual Visa card, bill payments, money transfers and savings vaults.',
    'Cross-border finance for the Central African diaspora.',
    array['Fintech', 'Rails', 'Vue.js']::text[],
    'Rails, Vue.js',
    'web-apps',
    'meyamb',
    null,
    'Platform development with Ruby on Rails and Vue.js',
    'The Central African diaspora',
    true,
    '[{"label":"Type","value":"Fintech web app"},{"label":"Audience","value":"Central African diaspora"},{"label":"Stack","value":"Rails, Vue.js, Redis"},{"label":"Delivery","value":"AWS CodePipeline"}]'::jsonb,
    '[{"icon":"card","title":"Virtual Visa card","text":"Users get a virtual Visa card."},{"icon":"check","title":"Bill payments","text":"Users pay bills directly from the app."},{"icon":"send","title":"Money transfers","text":"Users send money across borders."},{"icon":"vault","title":"Savings vaults","text":"Users set money aside in savings vaults."},{"icon":"shield","title":"KYC verification","text":"Identity checks verify each user."},{"icon":"clock","title":"Real-time history","text":"Every transaction shows up as it happens."}]'::jsonb,
    '[]'::jsonb,
    '[{"heading":"A cross-border fintech platform for the diaspora","paragraphs":["Meyamb serves the Central African diaspora: people who live abroad and still manage money across borders. In one platform they can use a virtual Visa card, pay bills directly, send money, save in vaults and follow every transaction in real time.","Money apps run on trust, so the platform also verifies its users with KYC checks."]},{"heading":"Our role on Meyamb","paragraphs":["Meyamb is client work. Agentix founder Ahtasham Naeem worked on the platform. It is built with Ruby on Rails and Vue.js, uses Redis, and ships through AWS CodePipeline."]},{"heading":"Why KYC and real-time history matter in a money app","paragraphs":["KYC stands for know your customer. Before someone can hold a card or send money, the platform checks who they are. It protects users from fraud and lets the service work with banks and card networks.","Real-time transaction history matters for the same reason: trust. When people send money home or pay a bill in another country, they want to see straight away that it went through. A virtual card adds a safe way to pay online without exposing a physical card."]},{"heading":"Built for people who manage money across borders","paragraphs":["For a diaspora audience, one app that covers a card, bills, transfers and savings means fewer services to juggle. If you are planning a fintech product of your own, our web app development service covers secure back ends, payment integrations and the dashboards around them."]}]'::jsonb,
    '[{"question":"Who is Meyamb for?","answer":"The Central African diaspora: people who live abroad and manage money across borders."},{"question":"What can Meyamb users do?","answer":"Use a virtual Visa card, pay bills directly, send money, save in savings vaults, verify their identity with KYC and see their transaction history in real time."},{"question":"What is Meyamb built with?","answer":"Ruby on Rails and Vue.js, with Redis, delivered through AWS CodePipeline."},{"question":"Do you build fintech web apps?","answer":"Yes. We build secure web apps with Ruby on Rails, Vue.js, React and Next.js, including payment integrations such as Stripe and PayPal. See our web app development service."}]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    array['Ruby on Rails', 'Vue.js', 'Redis', 'AWS CodePipeline']::text[],
    array['web-apps']::text[],
    array['autobuffy', 'nizame-taleem', 'research-buddy']::text[],
    'Cross-Border Fintech Platform – Meyamb | Agentix',
    'Meyamb is a cross-border fintech platform for the Central African diaspora: virtual Visa card, bill payments, money transfers, savings vaults and KYC.',
    'cross-border fintech platform',
    true,
    false,
    4,
    true
  ),
  (
    'research-buddy',
    'Research Buddy',
    'A reference and citation manager for researchers.',
    'A reference and citation manager with tags, folders, DOI and ISBN lookup, and automatic APA, MLA and Chicago citations.',
    'References and citations without the busywork.',
    array['Web app', 'React', 'Rails']::text[],
    'React, Rails',
    'web-apps',
    'research-buddy',
    null,
    'Built tagging, folders, filters, DOI/ISBN lookup and citations',
    'Researchers and students',
    true,
    '[{"label":"Type","value":"Web app"},{"label":"Audience","value":"Researchers"},{"label":"Stack","value":"React, Rails"},{"label":"Citation styles","value":"APA, MLA, Chicago"}]'::jsonb,
    '[{"icon":"folder","title":"Tags and folders","text":"Every source is tagged and filed."},{"icon":"search","title":"Advanced filters","text":"Narrow the library down to the source you need."},{"icon":"book","title":"DOI and ISBN lookup","text":"Enter a DOI or ISBN and the details fill in."},{"icon":"check","title":"Automatic citations","text":"APA, MLA and Chicago, written for you."}]'::jsonb,
    '[{"title":"Add a source","text":"Enter a DOI or ISBN and the metadata fills in."},{"title":"Organize it","text":"Tag it, file it in a folder and filter your library."},{"title":"Cite it","text":"Copy the citation in APA, MLA or Chicago style."}]'::jsonb,
    '[{"heading":"A reference and citation manager for researchers","paragraphs":["Researchers collect many sources, and formatting citations by hand is slow and easy to get wrong. Research Buddy keeps every reference in one library and writes the citation for you.","Sources come in through DOI and ISBN metadata lookup. Tags, folders and advanced filters keep the library easy to search."]},{"heading":"Results for researchers","paragraphs":["Research Buddy cut the time spent searching documents and writing citations by 50%."]},{"heading":"APA, MLA and Chicago in one library","paragraphs":["Different fields expect different citation styles. Psychology and education often use APA, the humanities often use MLA, and history often uses Chicago. Each style orders the author, date, title and publisher in its own way, which is easy to get wrong when you format by hand.","Research Buddy stores each source once, with the details it looked up from the DOI or ISBN, and produces the citation in the style you need. Switching a paper from one style to another no longer means retyping the reference list."]},{"heading":"How DOI and ISBN lookup saves time","paragraphs":["A DOI identifies a journal article and an ISBN identifies a book. Entering one of these numbers is enough for Research Buddy to fill in the title, authors and publication details, so researchers spend less time typing and make fewer mistakes."]}]'::jsonb,
    '[{"question":"Which citation styles does Research Buddy support?","answer":"APA, MLA and Chicago. Citations are generated automatically."},{"question":"How does it fill in source details?","answer":"Enter a DOI or an ISBN and Research Buddy looks up the metadata for you."},{"question":"How do researchers organize their sources?","answer":"With tags, folders and advanced filters."},{"question":"What changed for users?","answer":"Time spent searching documents and writing citations dropped by 50%."}]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    array['React.js', 'Ruby on Rails']::text[],
    array['web-apps']::text[],
    array['nizame-taleem', 'autobuffy', 'meyamb']::text[],
    'Reference & Citation Manager – Research Buddy | Agentix',
    'Research Buddy is a reference and citation manager with tags, folders, DOI and ISBN lookup, and automatic APA, MLA and Chicago citations for researchers.',
    'reference and citation manager',
    true,
    false,
    5,
    true
  ),
  (
    'uphex',
    'UpHex',
    'A web platform built by the Agentix team.',
    'A web platform built by the Agentix team.',
    null,
    array['Web app']::text[],
    'Web',
    'web-apps',
    'uphex',
    null,
    null,
    null,
    false,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    '{}'::text[],
    array['web-apps']::text[],
    array['autobuffy']::text[],
    'UpHex: A Web Platform Built In-House | Agentix',
    'UpHex is a web platform built in-house by the Agentix team. Full details are coming soon; ask us about Next.js and Supabase web app development.',
    'UpHex web platform',
    false,
    false,
    6,
    true
  ),
  (
    'nizame-taleem',
    'Nizame-Taleem',
    'A school management system for day-to-day school operations.',
    'A school management system that brings admissions, staff, classes, fees, attendance, exams and reports into one place.',
    'One system for school admin.',
    array['Web app', 'Rails', 'React']::text[],
    'Rails, React',
    'web-apps',
    'nizame-taleem',
    null,
    'Ruby on Rails and React development',
    'School administrators and staff',
    true,
    '[{"label":"Type","value":"School management system"},{"label":"Sector","value":"Education"},{"label":"Stack","value":"Rails, React, Bootstrap"},{"label":"Built with","value":"Ruby on Rails and React"}]'::jsonb,
    '[{"icon":"users","title":"Admissions","text":"New students are admitted in one place."},{"icon":"book","title":"Staff and classes","text":"Staff records and classes are managed together."},{"icon":"card","title":"Fees","text":"Fees are managed in the same system."},{"icon":"check","title":"Attendance","text":"Daily attendance is tracked in the system."},{"icon":"calendar","title":"Exams","text":"Exams are managed in the same system."},{"icon":"chart","title":"Reports","text":"Reports are generated from the same data."}]'::jsonb,
    '[]'::jsonb,
    '[{"heading":"A school management system in one place","paragraphs":["Running a school means handling admissions, staff, classes, fees, attendance, exams and reports every day. When each of these lives in a separate register or spreadsheet, routine work takes longer and reports drift out of date.","Nizame-Taleem brings all seven areas into one school management system, built with Ruby on Rails, React and Bootstrap."]},{"heading":"Results for school staff","paragraphs":["Reported results after the system went live:"],"bullets":["About 2 days less admin work per week for each staff member","About 45% better report accuracy","Routine tasks done 80% faster"]},{"heading":"What each part of a school management system does","paragraphs":["Admissions keep a record of every applicant and new student. Staff and class records show who teaches what and where. Fees track what each family owes and has paid. Attendance records who was present each day, exams store marks, and reports pull all of this together for the school office and the leadership team.","When these parts share one database, a change in one place shows up everywhere. A new student added at admission already appears in class lists, fee records and attendance, so staff stop entering the same details again and again."]}]'::jsonb,
    '[{"question":"Which areas does Nizame-Taleem cover?","answer":"Admissions, staff, classes, fees, attendance, exams and reports."},{"question":"What changed for school staff?","answer":"Admin work dropped by about 2 days per week for each staff member, report accuracy improved by about 45%, and routine tasks became 80% faster."},{"question":"What is Nizame-Taleem built with?","answer":"Ruby on Rails, React.js and Bootstrap."},{"question":"Can you build a school management system for us?","answer":"Yes. Tell us how your school runs today and which areas you want in one place, and we will reply with a plan and a timeline."}]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    array['Ruby on Rails', 'React.js', 'Bootstrap']::text[],
    array['web-apps']::text[],
    array['research-buddy', 'clinidesk', 'meyamb']::text[],
    'School Management System – Nizame-Taleem | Agentix',
    'Nizame-Taleem is a school management system for admissions, staff, classes, fees, attendance, exams and reports, built with Ruby on Rails and React.',
    'school management system',
    true,
    false,
    7,
    true
  ),
  (
    'internal-draft',
    'Internal Draft',
    'Unpublished test row. It must never appear on the site.',
    'Unpublished test row. It must never appear on the site.',
    null,
    array['Test']::text[],
    'Test',
    'web-apps',
    'uphex',
    null,
    null,
    null,
    false,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '{}'::text[],
    '{}'::text[],
    '{}'::text[],
    '{}'::text[],
    'Internal Draft Product For Tests | Agentix',
    'Unpublished test row used by the database and end-to-end tests to prove that draft products are never visible to anonymous visitors.',
    'internal draft',
    false,
    false,
    99,
    false
  );

-- Blog posts are drafts. Publish one by setting published = true and published_at = now().
insert into public.posts (slug, title, seo_title, description, body, related_services, published) values
  (
    'ai-agent-vs-chatbot',
    'AI agent vs chatbot: what is the difference',
    'AI Agent vs Chatbot: What Is the Difference? | Agentix',
    'A chatbot answers questions; an AI agent also takes action in your tools. Learn the difference, when each is enough and how they work together.',
    '"Chatbot" and "AI agent" are often used as if they mean the same thing. They do not. The difference decides what the software can do for your business, how much setup it needs and what it costs to run.

The short version: **a chatbot answers, an AI agent acts.**

## What a chatbot does

A chatbot is a conversation interface. Someone types a question and the chatbot replies. Older chatbots follow fixed menus and keywords. Newer ones use a language model, so they understand free text and answer more naturally.

What both kinds have in common is that the conversation is the product. The chatbot can explain your opening hours or your return policy, but it does not change anything in your systems. If a customer asks to book a table, a chatbot can tell them how to book. It cannot book.

## What an AI agent does

An AI agent uses a language model too, but it is connected to tools and allowed to use them. When a customer asks to book, the agent checks the calendar, offers a free time, books it and confirms. When a lead comes in, it can add them to the CRM and notify your team.

An agent works toward a goal, not just a reply. It decides the next step, uses a tool, looks at the result and continues until the job is done or it needs a person.

An agent does not even need a chat window. Some agents run in the background, for example reading new orders every hour and flagging the ones that need attention.

## Side by side

| | Chatbot | AI agent |
| --- | --- | --- |
| Main job | Answer questions | Complete tasks |
| Connected to your tools | Rarely | Yes, by design |
| Example | "Our clinic opens at 9." | Books the 9:30 slot and sends a confirmation |
| Needs | Good answers and a knowledge base | Answers plus tool access, rules and monitoring |
| Risk if wrong | A wrong answer | A wrong action, so it needs clear limits |
| Hand-off to a person | Optional | Essential for unusual cases |

## When a chatbot is enough

A chatbot is a good fit when people mainly need information:

- Frequently asked questions about prices, hours or policies
- Guiding visitors to the right page or form
- Collecting a name and a question before a person replies

If nobody needs to book, change or look up anything for the customer, an agent adds cost without much benefit.

## When you need an AI agent

Choose an agent when the conversation should end with something done:

- **Bookings.** The answer depends on live availability, and the booking must be saved.
- **Order questions.** "Where is my order?" needs a lookup in your order system.
- **Lead follow-up.** New leads need a reply, a few questions and a record in your CRM.
- **Internal tasks.** Moving data between apps, preparing a report, updating a record.

Our [CliniDesk WhatsApp booking system](/products/clinidesk) is a clear example. A chatbot could tell a patient which days a doctor works. The CliniDesk agent checks each doctor''s real availability, books the slot, and the booking appears on the clinic''s dashboard straight away.

## A worked example: "Where is my order?"

Imagine a customer writes to an online store: "Where is my order? I ordered on Monday."

A **chatbot** replies with general information: "Orders usually ship within two days. You can track yours with the link in your confirmation email." That is helpful, but the customer still has to go and look.

An **AI agent** asks for the order number or matches the customer''s phone number, looks the order up in the store system, and replies: "Your order shipped yesterday and arrives on Friday." If the customer then asks to change the delivery address, the agent can check whether that is still possible, or pass the request to a person with the order details attached.

The second experience is better for the customer and saves your team a lookup. It also shows why the agent needs more care: it reads real order data, so it must only see what it needs.

## How they work together

In practice, many agents talk through a chat window, so from the outside they look like chatbots. The difference is what happens behind the reply. A common setup is:

1. The chat interface receives the message, for example on WhatsApp.
2. The agent decides whether it can answer from your information or needs to act.
3. If it needs to act, it calls a workflow that does the work, often built in [n8n](/services/n8n-automation).
4. If the request is unusual, it hands the conversation to a person.

This means you can start with a simple question-and-answer bot and add actions later, one at a time.

## What affects the cost

There is no single price for either, but the cost drivers are different.

For a chatbot, cost mostly depends on how much content it needs to know and how many conversations it handles.

For an agent, add the work of connecting tools, writing the rules for each action, testing edge cases and setting up monitoring. If it runs on WhatsApp, Meta also charges conversation fees that depend on your country and volume. The more actions an agent can take, the more testing it needs before launch.

## How to decide

Ask one question: **at the end of the conversation, does something need to change in your systems?**

- If no, start with a chatbot.
- If yes, you need an agent, even if it only does one action at first.

If you are unsure, describe the job in a few sentences. Our [custom AI agent development](/services/ai-agents) team can tell you which approach fits, and you can [request a quote](/contact) with no commitment.

## Key points

- A chatbot answers questions; an AI agent also takes action in your tools.
- Agents need tool access, clear rules, a human hand-off and monitoring.
- Many agents use a chat window, so the difference is in what happens behind the reply.
- Start with the simplest option that gets the job done, then add actions over time.
',
    array['ai-agents']::text[],
    false
  ),
  (
    'automate-lead-follow-up-with-n8n',
    'How to automate lead follow-up with n8n',
    'How to Automate Lead Follow-Up with n8n | Agentix',
    'A practical guide to automating lead follow-up with n8n: capture leads, reply in seconds, qualify with AI, update your CRM and alert sales on Slack.',
    'A new lead is most interested in the first minutes after they reach out. If they wait hours for a reply, many will have moved on or contacted someone else. Automating the first steps of follow-up with n8n means every lead gets a fast, consistent reply, even at night or on a weekend.

This guide shows how to design and build a lead follow-up workflow in n8n, step by step.

## What the workflow should do

Before opening n8n, write down the job in plain words. A typical lead follow-up looks like this:

1. A lead arrives from a form, WhatsApp or email.
2. They get a friendly reply within seconds.
3. A few questions find out what they need and whether it is a good fit.
4. The lead is added to the CRM with the answers.
5. The sales team is notified on Slack, with the important details.
6. If the lead does not reply, a reminder goes out later.

This is the same flow we show on our home page as the "Lead follow-up agent": trigger, AI agent, CRM, Slack.

## Step 1: Capture the lead

Every n8n workflow starts with a trigger. Common choices are:

- **A webhook** that your website form posts to.
- **A WhatsApp trigger** through the WhatsApp Business Cloud API.
- **An email trigger** that watches a shared inbox.

If leads come from several places, use one small workflow per source that cleans the data into the same shape, then passes it to one shared follow-up workflow. That keeps the main logic in a single place.

## Step 2: Reply straight away

The first reply should go out before anything else happens. It does not need to be long: thank the person, confirm what they asked for, and say what happens next. Send it on the same channel the lead used.

A fast reply is also a check that your contact details are correct. If a message fails, the workflow can flag the lead for a person to call.

## Step 3: Qualify the lead with AI

This is where an AI step earns its place. A language model can read the lead''s message and pull out structured facts, such as what service they want, their timeline and their budget range. It can also decide which follow-up question to ask next.

Keep the AI step narrow:

- Give it a short, clear instruction and the list of fields you need.
- Ask for the answer in a fixed format, so the next node can read it.
- Never let it invent details the lead did not provide.

If the lead''s answers are unclear, the workflow should ask again or pass the conversation to a person.

## Step 4: Create or update the CRM record

Next, add the lead to your CRM. Search for an existing contact first, by email or phone number, so you update it instead of creating a duplicate. Save the source, the qualification answers and a link to the conversation.

If you do not use a CRM yet, a Google Sheet works as a starting point. The workflow can move to a proper CRM later without changing the steps before it.

## Step 5: Notify your sales team

Send a Slack message to the right channel with the lead''s name, what they want, how they were qualified and a link to the CRM record. Good alerts are short and actionable. If a lead looks especially urgent, mention the person on call.

## Step 6: Follow up automatically

Some leads do not reply to the first question. Add a wait step, then check whether they answered. If not, send one gentle reminder. Stop after one or two reminders, so follow-up never turns into spam.

## Handle errors from day one

Workflows fail for ordinary reasons: an API is down, a token expires, a field is empty. In n8n you can attach an error workflow that runs whenever another workflow fails. Use it to:

- Post the error to a Slack channel your team watches.
- Save the failed lead so nobody is lost.
- Retry later when the cause is temporary.

Monitoring is one of the most common things we add for clients, because a silent failure is worse than no automation at all.

## Test with real examples

Before switching the workflow on, run it with a handful of real past leads:

- A clear, complete request
- A vague one-line message
- A message in another language
- A lead that already exists in the CRM

Check every step''s output, not just the final Slack message. Adjust the AI instructions where the extracted fields are wrong.

## Measure what changed

After launch, track a few simple numbers: how fast leads get a first reply, how many complete the qualifying questions, and how many turn into conversations with your team. These show whether the workflow helps and where to improve it.

## When to get help

A basic version of this workflow can be built in an afternoon. The work that takes longer is the detail: clean data from several sources, reliable CRM updates, good AI instructions and solid error handling.

Our [n8n automation services](/services/n8n-automation) cover all of it, and when the follow-up needs real conversations, we combine the workflow with [custom AI agent development](/services/ai-agents). If you want a workflow like this for your own leads, [send us a short description](/contact) of where they come from today.

## Key points

- Reply to every lead within seconds, on the channel they used.
- Use an AI step to qualify, but keep it narrow and structured.
- Update the CRM without duplicates and alert sales on Slack.
- Add reminders, error handling and monitoring before you launch.
',
    array['n8n-automation', 'ai-agents']::text[],
    false
  ),
  (
    'n8n-vs-zapier-vs-make',
    'n8n vs Zapier vs Make: how to choose an automation tool',
    'n8n vs Zapier vs Make: How to Choose | Agentix',
    'Compare n8n, Zapier and Make on hosting, data control, billing model, complexity, AI steps and team skills, and pick the right tool for your workflows.',
    'n8n, Zapier and Make all connect your apps and run steps automatically. On a simple task, any of them will do the job. The differences show up when workflows grow, data is sensitive, volume rises or a team without developers needs to maintain them.

This guide compares the three on the points that usually decide the choice. It does not list prices, because they change often. Instead it explains how each tool charges, so you can estimate the cost for your own volume on each vendor''s pricing page.

## The short answer

- **Zapier** is the quickest way to connect two common apps with no technical knowledge.
- **Make** suits visual, branching workflows and teams that like to see the whole flow on one canvas.
- **n8n** suits teams that want control: self-hosting, custom code, complex logic and AI steps.

Most of the decision comes down to five questions.

## 1. Where should your data live?

Zapier and Make are cloud services. Your workflows and the data that passes through them run on their servers.

n8n can run in the cloud too, but it can also be self-hosted on your own server. That matters when you handle customer records, health data or anything you prefer to keep inside your own infrastructure. The trade-off is that self-hosting means you are responsible for uptime, updates, backups and security, or you pay someone to be.

## 2. How does each tool charge?

The billing unit changes which tool is cheaper for you.

- **Zapier** counts tasks: roughly, each action step that runs uses one.
- **Make** counts operations: each module that runs in a scenario uses one.
- **n8n Cloud** counts workflow executions: one run of a workflow counts once, however many steps it has. Self-hosted n8n has no per-run fee, but you pay for the server and its upkeep.

So a workflow with many steps that runs often can cost very different amounts on each tool. Count your expected runs and steps per run, then compare.

## 3. How complex are your workflows?

For a straight line, "when a form is filled, add a row to a sheet", all three are easy.

Things change with branching, loops, error handling and data transformation:

- Make shows complex branching clearly on a visual canvas.
- n8n handles complex logic well and lets you write JavaScript or Python when a built-in node is not enough.
- Zapier supports paths and filters, but very complex logic becomes harder to read and maintain.

## 4. Do you need AI steps?

All three can call OpenAI and other AI services. n8n has gone furthest in building AI agents directly into workflows: an agent node can use other nodes as tools, keep memory and decide which step to take next. If you plan to build [AI agents](/services/ai-agents) that act in your systems, this is a strong reason to look at n8n.

## 5. Who will maintain it?

This question is easy to skip and expensive to get wrong.

- If the people maintaining workflows are not technical, Zapier''s simplicity is worth a lot.
- If they are comfortable with visual logic, Make is a good middle ground.
- If you have a developer, or work with one, n8n gives the most room to grow.

## Comparison at a glance

| | Zapier | Make | n8n |
| --- | --- | --- | --- |
| Hosting | Cloud only | Cloud only | Cloud or self-hosted |
| Billing unit | Tasks | Operations | Executions (cloud) |
| Best for | Simple two-step automations | Visual, branching flows | Complex logic, control, AI |
| Custom code | Limited | Limited | JavaScript and Python |
| Learning curve | Lowest | Medium | Highest |

Integration counts change all the time, so check each tool''s app directory for the exact apps you use. If an app is missing, n8n and Make can usually reach it through its API with a generic HTTP step.

## A simple way to decide

1. List your first three workflows and the apps they touch.
2. Estimate how often each runs and how many steps it has.
3. Decide whether any data must stay on your own servers.
4. Decide who will maintain the workflows a year from now.
5. Build the most important workflow in your top choice before committing.

## Common mistakes when choosing

- **Choosing on the first workflow only.** Your fifth workflow will be more complex than your first. Pick a tool that fits where you are heading.
- **Comparing headline prices.** A plan that looks cheap can cost more once you count steps per run and how often each workflow runs.
- **Ignoring maintenance.** Someone has to fix a workflow when an app changes its API. Make sure that person can work with the tool you pick.
- **Mixing tools without a reason.** Running automations across two or three platforms makes failures harder to trace. Standardise where you can.

## Why we often use n8n

At Agentix we use n8n for most client work, because many of our projects combine automation with AI agents and need custom logic. Self-hosting is useful for clients with sensitive data, and code steps let us handle edge cases cleanly. Our [CliniDesk](/products/clinidesk) booking system, for example, uses an n8n agent to check each doctor''s availability before it offers a slot.

That said, it is not always the right answer. For a small team with a few simple automations and nobody technical, Zapier is often the better fit.

If you want an outside view on your workflows, our [n8n automation services](/services/n8n-automation) include a short review of what you want to automate and which tool suits it. You can [ask for a quote](/contact) and we will reply with a plan.

## Key points

- Zapier is the simplest, Make is the most visual, n8n gives the most control.
- Compare billing units against your own volume instead of headline prices.
- Self-hosting n8n keeps data on your servers, but you take on the upkeep.
- Choose based on complexity, data rules, AI needs and who maintains the workflows.
',
    array['n8n-automation']::text[],
    false
  ),
  (
    'what-is-an-ai-agent',
    'What is an AI agent and how can it help your business',
    'What Is an AI Agent? How It Helps Your Business | Agentix',
    'An AI agent understands a request, decides what to do and acts in your tools. Here is how agents work, where they help and how to start with one job.',
    'Most businesses already use software that waits for instructions. You click a button and it does one thing. An AI agent is different. You give it a goal, and it works out the steps to reach it inside the tools you already use.

This guide explains what an AI agent is, how it works, which jobs it does well, and how to start without a big project.

## What an AI agent is

An AI agent is software that understands a request, decides what to do and then takes action. A customer might write "Can I come in on Tuesday afternoon?" The agent reads the message, checks the calendar, offers a free slot, books it once the customer agrees and sends a confirmation.

Three things make this an agent and not just a script:

- **It understands language.** A large language model reads messages the way a person would, including spelling mistakes, mixed languages and voice notes.
- **It decides.** It chooses the next step based on the situation, for example whether to book, ask a question or pass the conversation to a person.
- **It acts.** It is connected to real tools, such as a calendar, a CRM, a spreadsheet or WhatsApp, so it can do the work instead of describing it.

## How an AI agent works, step by step

Under the hood, most business agents follow the same loop.

1. **A trigger starts it.** A new WhatsApp message, an email, a form entry or a schedule.
2. **The model reads the context.** It looks at the message plus any rules and data you give it, such as opening hours or a price list.
3. **It picks an action.** Check availability, look up an order, create a contact, draft a reply.
4. **It uses a tool.** The action runs through an API or a workflow tool such as n8n.
5. **It checks the result and replies.** If something is missing, it asks. If the case is unusual, it hands over to your team.

At Agentix we usually build this loop with [n8n](/services/n8n-automation), which connects the model to your tools and keeps a log of every run. That log matters: you can see what the agent did and why.

## Jobs AI agents do well

Agents are strongest on work that repeats every day, follows clear rules and lives in a few tools.

### Answering customer questions

Questions about prices, opening hours, delivery or order status come in all day. An agent can answer the common ones at any hour, in the customer''s language, and pass the rest to a person with the conversation attached.

### Booking appointments

Booking is a good first job because the rules are clear: a slot is free or it is not. [CliniDesk](/products/clinidesk), our WhatsApp booking system for clinics, lets patients book, reschedule and cancel in chat. The agent checks each doctor''s real availability before it offers a time, so two patients never get the same slot.

### Following up with leads

New leads go cold when nobody replies. An agent can answer in seconds, ask a few qualifying questions, add the lead to your CRM and tell your sales team on Slack.

### Research and summaries

Agents can read documents, pull out what matters and write a short summary. When the documents are private, the model can run locally so files never leave your systems.

## What an AI agent needs to work well

A good agent is less about the model and more about the setup around it.

- **One clear job.** "Book appointments for our three doctors" works. "Handle customer service" is too wide to start with.
- **Access to the right tools.** The agent can only act where it is connected. Decide which systems it may read and which it may change.
- **Written rules.** Opening hours, prices, what to say when unsure. These rules become part of the instructions the agent follows.
- **A hand-off to a person.** Decide when the agent should stop and pass the case on, and make sure the person sees the full conversation.
- **Monitoring.** Review conversations in the first weeks. Most fixes are small changes to the rules.

## Limits to keep in mind

AI agents are useful, but they are not magic. A language model can sound confident while being wrong, so an agent should only state facts it can check in your data. It should never invent prices or promises.

Privacy also matters. Only connect the data the job needs, keep access keys on the server, and store as little personal data as possible. For sensitive documents, a local model is often the safer choice.

Finally, an agent is not a replacement for good service. It takes the repetitive part off your team so they have more time for the conversations that need a person.

## How to start

Start small and measure.

1. **Pick one job** that takes your team time every day.
2. **Write down the rules** your team already follows for it.
3. **List the tools** involved and who may change what.
4. **Build and test** with real examples before going live.
5. **Review and adjust** for a few weeks, then add the next job.

If you want help with the first step, our [custom AI agent development](/services/ai-agents) service covers the whole path, from planning the job to monitoring the agent after launch. You can also [send us a short description](/contact) of the task and we will reply with a plan, a timeline and a price.

## Key points

- An AI agent understands a request, decides what to do and acts in your tools.
- It works best on repetitive, rule-based jobs such as support, bookings and lead follow-up.
- The setup around it matters most: one clear job, the right tools, written rules, a human hand-off and monitoring.
- Start with one job, measure the result, then grow.
',
    array['ai-agents', 'n8n-automation']::text[],
    false
  ),
  (
    'whatsapp-appointment-booking-bot-for-clinics',
    'How a WhatsApp appointment booking bot works for clinics',
    'WhatsApp Appointment Booking Bot for Clinics | Agentix',
    'How a WhatsApp booking bot takes clinic appointments in chat, checks each doctor''s real availability, avoids double bookings and updates a dashboard.',
    'Patients already use WhatsApp every day. Many would rather send a message than call a busy front desk, especially outside opening hours. A WhatsApp appointment booking bot lets them book in that chat, while the clinic keeps full control of its calendar.

This guide walks through how such a bot works, using our own product, [CliniDesk](/products/clinidesk), as the example.

## Why clinics move booking to WhatsApp

Phone booking has a few known problems. Lines are busy at peak times, nobody answers after hours, and staff spend a large part of the day on calls that follow the same pattern: which doctor, which day, which time.

WhatsApp solves the access problem because patients do not need to install anything. A booking bot solves the workload problem because it handles the repetitive part of the conversation at any hour.

## The booking flow, step by step

Here is what happens when a patient writes "I need an appointment".

### 1. The message arrives

The clinic''s WhatsApp number is connected to the WhatsApp Business Cloud API. Each new message is passed to a workflow, in CliniDesk''s case built with n8n.

### 2. The agent understands the request

A language model reads the message. In CliniDesk, patients can write in Urdu, Roman Urdu or English, or send a voice note. The agent works out what the patient wants: a new booking, a change, a cancellation or just a question.

### 3. It checks real availability

This is the step that matters most. Before offering any time, the agent checks each doctor''s actual schedule and the bookings already made. It only offers slots that are genuinely free.

### 4. It offers a slot and confirms

The agent replies with an option, for example "Tomorrow, 5:00 pm is open. Shall I book it?" When the patient agrees, it creates the booking and sends a confirmation in the same chat.

### 5. The dashboard updates

The new appointment appears on the clinic''s dashboard straight away, with the patient''s history attached. Doctors and staff see the day''s schedule in one place.

## How double bookings are prevented

Double bookings usually happen when two people work from different copies of the calendar, or when a slot is offered before anyone checks whether it is still free.

A well-built bot avoids both. It reads availability from the same database the dashboard uses, and it checks again at the moment of booking. Once a slot is taken, it is no longer offered to anyone else.

## Rescheduling and cancelling

Changes are as common as new bookings. In CliniDesk, patients can reschedule or cancel in the same WhatsApp chat. The freed slot becomes available again, so another patient can take it. Staff do not need to update anything by hand.

## What clinic staff see

The bot is only half of the system. The other half is the dashboard that the clinic uses every day. In CliniDesk it shows:

- Hospital and doctor appointments in one view
- Each patient''s visit history
- Doctor schedules, which drive the slots the bot can offer
- Booking analytics
- Staff roles, so each person sees the right tools

If you are planning a similar system, the dashboard deserves as much attention as the chat. Our [web app development](/services/web-apps) work often focuses on exactly this part.

## Reminders and no-shows

Many clinics lose time to patients who forget their appointment. Because the booking already lives in WhatsApp, the same channel can carry a reminder before the visit, with an easy way to cancel. A cancelled slot can then be offered to someone else instead of staying empty.

## When the bot should hand over to a person

Not every message is a booking. Some patients describe symptoms, ask about results or have an urgent problem. A good booking bot recognises these cases and passes them to a person instead of guessing. The rules for when to hand over should be agreed with the clinic before launch and reviewed regularly.

## Privacy and patient data

Health information is sensitive, so a few principles apply:

- Collect only what the booking needs, such as name, phone number and the type of visit.
- Keep medical records in the clinic''s own systems, not in chat messages.
- Store data in a secure database with access limited by role.
- Follow the local rules on patient data that apply to your clinic.

A bot should make booking easier without becoming a second, uncontrolled copy of patient records.

## What you need to set up a booking bot

1. **A WhatsApp Business number** connected through the WhatsApp Business Cloud API.
2. **Doctor schedules** in a form the system can read.
3. **Booking rules**, such as visit lengths, breaks and how far ahead patients may book.
4. **A dashboard** for staff, or a connection to the system you already use.
5. **Hand-off rules** for anything that is not a simple booking.

From there, the work is mostly testing with real conversations: different languages, unclear requests and last-minute changes.

## Is it right for your clinic?

A WhatsApp booking bot pays off when a large share of your calls are routine bookings and changes, and when patients already message you on WhatsApp. It is less useful if most visits need a long phone conversation first.

If you want to see the full system, read about [CliniDesk](/products/clinidesk). If you need a booking agent shaped around your own clinic or business, our [custom AI agent development](/services/ai-agents) service and [n8n automation services](/services/n8n-automation) cover the agent and the workflows behind it. [Tell us how your clinic books today](/contact) and we will suggest a plan.

## Key points

- A WhatsApp booking bot lets patients book, reschedule and cancel in a chat they already use.
- The key step is checking real availability before offering a slot.
- The staff dashboard is as important as the chat.
- Clear hand-off rules and careful handling of patient data are essential.
',
    array['ai-agents', 'n8n-automation', 'web-apps']::text[],
    false
  ),
  (
    'why-we-build-with-nextjs-and-supabase',
    'Why we build web apps with Next.js and Supabase',
    'Why We Build Web Apps with Next.js and Supabase | Agentix',
    'Why Agentix builds most new web apps with Next.js and Supabase, how the two fit together securely, and when we choose Ruby on Rails instead.',
    'Every web app needs the same basic parts: pages that load fast, a database, user accounts, and rules about who can see what. For most new projects, we build these with Next.js and Supabase. This article explains why, how the two fit together, and when we pick something else.

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

This is the feature we rely on most. Row level security lets the database itself decide which rows each user may read or change. Even if a mistake slipped into the app code, the database would still refuse to show one customer''s data to another. On this very website, for example, the public can read published products but cannot read quote requests at all.

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

For logged-in dashboards, the same server rendering means less work for the user''s phone or laptop, which keeps the app responsive on older devices.

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
',
    array['web-apps']::text[],
    false
  );
