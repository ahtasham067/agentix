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

  it("filters by category with the chips", async () => {
    const user = userEvent.setup();
    render(<ProductGrid products={projects} showFilters />);
    const filters = screen.getByRole("group", { name: "Filter products" });
    expect(within(filters).getByRole("button", { name: "All 7" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(within(filters).getByRole("button", { name: "AI Agents" }));
    expect(screen.getAllByRole("article").map((a) => a.querySelector("h3")?.textContent)).toEqual([
      "CliniDesk",
      "Nexa AI",
      "Your project here",
    ]);

    await user.click(within(filters).getByRole("button", { name: "Automation" }));
    expect(screen.getByRole("heading", { name: "CliniDesk" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Meyamb" })).not.toBeInTheDocument();

    await user.click(within(filters).getByRole("button", { name: "Web Apps" }));
    expect(screen.queryByRole("heading", { name: "CliniDesk" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nizame-Taleem" })).toBeInTheDocument();
  });
});

describe("FAQ", () => {
  const items = [
    { question: "First?", answer: "First answer." },
    { question: "Second?", answer: "Second answer." },
  ];

  it("opens the first answer and links buttons to panels", () => {
    render(<FAQ items={items} />);
    const first = screen.getByRole("button", { name: "First?" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(first.getAttribute("aria-controls")!);
    expect(panel).toHaveTextContent("First answer.");
    expect(panel).not.toHaveAttribute("hidden");
  });

  it("toggles answers and keeps closed ones in the DOM", async () => {
    const user = userEvent.setup();
    render(<FAQ items={items} />);
    const second = screen.getByRole("button", { name: "Second?" });
    const panel = document.getElementById(second.getAttribute("aria-controls")!)!;
    expect(second).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("hidden");
    expect(panel).toHaveTextContent("Second answer.");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "First?" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(panel).not.toHaveAttribute("hidden");
  });
});

describe("Navbar", () => {
  it.each([
    ["/", "Home"],
    ["/products", "Products"],
    ["/products/clinidesk", "Products"],
    ["/services/ai-agents", "Services"],
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
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("follows the count when products are unpublished", () => {
    expect(getStats(5).find((s) => s.label === "products in our portfolio")?.value).toBe("5");
  });
});
