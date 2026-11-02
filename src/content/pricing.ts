import type { ServiceSlug } from "./types";

/**
 * Pricing, in one place. Every page, the FAQ, llms.txt and the JSON-LD offers
 * read from here. Prices are the owner's figures; nothing else is implied.
 */

/** ISO 4217 code. Confirmed by the owner: Pakistani rupees. */
export const CURRENCY = "PKR" as const;

/** Symbol shown before amounts on the site. */
const CURRENCY_SYMBOL: Record<typeof CURRENCY, string> = { PKR: "Rs" };

export const PRICING_DISCLAIMER =
  "Prices may change slightly depending on your project, but most projects fit within these plans.";

export const PLAN_KEYS = ["one-time", "subscription"] as const;
export type PlanKey = (typeof PLAN_KEYS)[number];

export interface PricePlan {
  key: PlanKey;
  name: string;
  amount: number;
  /** Billing period for subscriptions. */
  interval?: "month";
  /** Neutral description of how the plan is paid. */
  // TODO: confirm inclusions. Only the payment terms are stated until the owner lists what each plan includes.
  included: string[];
}

export interface PricingGroup {
  key: "website" | "chatbot";
  service: ServiceSlug;
  title: string;
  message: string;
  plans: [PricePlan, PricePlan];
}

export const pricingGroups: PricingGroup[] = [
  {
    key: "website",
    service: "web-development",
    title: "Custom website",
    message: "Get a custom website for your project in either plan.",
    plans: [
      {
        key: "one-time",
        name: "One-time plan",
        amount: 5999,
        included: ["One payment for the website build", "Scope agreed before work starts"],
      },
      {
        key: "subscription",
        name: "Subscription plan",
        amount: 999,
        interval: "month",
        included: ["Paid monthly instead of up front", "Scope agreed before work starts"],
      },
    ],
  },
  {
    key: "chatbot",
    service: "chatbots-ai-agents",
    title: "Chatbot",
    // TODO: confirm copy. Mirrors the website message; the owner gave no chatbot message.
    message: "Get a chatbot for your business in either plan.",
    plans: [
      {
        key: "one-time",
        name: "One-time plan",
        amount: 8999,
        included: ["One payment for the chatbot build", "Scope agreed before work starts"],
      },
      {
        key: "subscription",
        name: "Subscription plan",
        amount: 1499,
        interval: "month",
        included: ["Paid monthly instead of up front", "Scope agreed before work starts"],
      },
    ],
  },
];

/** "Rs 5,999" */
export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL[CURRENCY]} ${amount.toLocaleString("en-US")}`;
}

/** "Rs 5,999" or "Rs 999 per month" */
export function formatPlanPrice(plan: Pick<PricePlan, "amount" | "interval">): string {
  return plan.interval
    ? `${formatPrice(plan.amount)} per ${plan.interval}`
    : formatPrice(plan.amount);
}

/** Link to the quote form with the service and plan preselected. */
export function quoteHref(service: ServiceSlug, plan: PlanKey): string {
  return `/contact?service=${service}&plan=${plan}#quote`;
}

export function getPricingGroup(service: ServiceSlug): PricingGroup | undefined {
  return pricingGroups.find((g) => g.service === service);
}

/** One sentence that states a group's prices, for FAQ answers and llms.txt. */
export function pricingSentence(group: PricingGroup): string {
  const [oneTime, subscription] = group.plans;
  return `${group.title}: ${formatPrice(oneTime.amount)} one-time, or ${formatPlanPrice(subscription)} on the subscription plan.`;
}
