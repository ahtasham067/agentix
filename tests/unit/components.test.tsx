import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FAQ } from "@/components/sections/FAQ";
import { StatsBand } from "@/components/sections/StatsBand";
import { projects } from "@/content/projects";
import { getStats } from "@/lib/stats";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

const { Navbar, isActive } = await import("@/components/layout/Navbar");

describe("ProductGrid", () => {
  it("shows every product with a link to its detail page", () => {
    render(<ProductGrid products={projects} />);
    for (const p of projects) {
      const link = screen.getByRole("link", { name: `View details about ${p.name}` });
      expect(link).toHaveAttribute("href", `/products/${p.slug}`);
    }
  });

  it("tags each card with the filters it matches", () => {
    render(<ProductGrid products={projects} />);
    const match = (slug: string) =>
      document.querySelector(`[data-product="${slug}"]`)?.getAttribute("data-match");
    expect(match("clinidesk")).toBe("ai-agents automation");
    expect(match("nexa-ai")).toBe("ai-agents");
    expect(match("meyamb")).toBe("web-apps");
  });

  it("filters with the chips by setting data-filter", async () => {
    const user = userEvent.setup();
    const { container } = render(<ProductGrid products={projects} showFilters />);
    const filters = screen.getByRole("group", { name: "Filter products" });
    const wrapper = container.querySelector("[data-filter]")!;
    expect(within(filters).getByRole("button", { name: "All 8" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(wrapper).toHaveAttribute("data-filter", "all");

    await user.click(within(filters).getByRole("button", { name: "AI Agents" }));
    expect(wrapper).toHaveAttribute("data-filter", "ai-agents");
    expect(within(filters).getByRole("button", { name: "AI Agents" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(within(filters).getByRole("button", { name: "All 8" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    await user.click(within(filters).getByRole("button", { name: "Automation" }));
    expect(wrapper).toHaveAttribute("data-filter", "automation");
  });
});

describe("FAQ", () => {
  const items = [
    { question: "First?", answer: "First answer." },
    { question: "Second?", answer: "Second answer.", extra: true },
  ];

  it("renders an exclusive accordion with the first answer open", () => {
    const { container } = render(<FAQ items={items} name="test-faq" />);
    const details = container.querySelectorAll("details");
    expect(details).toHaveLength(2);
    expect(details[0]).toHaveAttribute("open");
    expect(details[1]).not.toHaveAttribute("open");
    details.forEach((d) => expect(d).toHaveAttribute("name", "test-faq"));
  });

  it("keeps every answer in the DOM and uses headings for questions", () => {
    render(<FAQ items={items} />);
    expect(screen.getByRole("heading", { level: 3, name: "First?" })).toBeInTheDocument();
    expect(screen.getByText("Second answer.")).toBeInTheDocument();
  });

  it("marks SEO-only questions for the visual tests", () => {
    const { container } = render(<FAQ items={items} />);
    const details = container.querySelectorAll("details");
    expect(details[0]).not.toHaveAttribute("data-seo-extra");
    expect(details[1]).toHaveAttribute("data-seo-extra", "true");
  });
});

describe("Navbar", () => {
  it.each([
    ["/", "Home"],
    ["/products", "Products"],
    ["/products/clinidesk", "Products"],
    ["/services/chatbots-ai-agents", "Services"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ])("marks the active link on %s", (path, label) => {
    pathname.current = path;
    render(<Navbar />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    const active = within(nav)
      .getAllByRole("link")
      .filter((l) => l.getAttribute("aria-current") === "page");
    expect(active.map((l) => l.textContent)).toEqual([label]);
  });

  it("does not treat Home as a prefix", () => {
    expect(isActive("/products", "/")).toBe(false);
    expect(isActive("/servicesx", "/services")).toBe(false);
  });

  it("toggles the mobile menu", async () => {
    pathname.current = "/";
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.getElementById("mobile-menu")).not.toHaveAttribute("hidden");
  });
});

describe("StatsBand", () => {
  it("shows the published product count", () => {
    render(<StatsBand productCount={7} />);
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("products in our portfolio")).toBeInTheDocument();
    expect(screen.getByText("20+")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("follows the count when products are unpublished", () => {
    expect(getStats(5).find((s) => s.label === "products in our portfolio")?.value).toBe("5");
  });
});
