import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const submitQuote = vi.fn();
vi.mock("@/app/contact/actions", () => ({
  submitQuote: (...args: unknown[]) => submitQuote(...args),
}));

const { QuoteForm } = await import("@/components/quote/QuoteForm");

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.selectOptions(screen.getByLabelText("Service"), "ai-agents");
  await user.selectOptions(screen.getByLabelText("Budget range"), "not-sure");
  await user.type(
    screen.getByLabelText("Project details"),
    "We need a WhatsApp booking agent for our clinic.",
  );
}

describe("QuoteForm", () => {
  beforeEach(() => submitQuote.mockReset());

  it("labels every field", () => {
    render(<QuoteForm />);
    for (const label of ["Full name", "Email", "WhatsApp number", "Service", "Budget range", "Project details"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("shows inline errors and does not submit when fields are invalid", async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.click(screen.getByRole("button", { name: "Send request" }));

    expect(await screen.findByText("Please enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a service.")).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-describedby", "fullName-error");
    expect(submitQuote).not.toHaveBeenCalled();
  });

  it("shows the success state after a valid submission", async () => {
    submitQuote.mockResolvedValue({ status: "success", name: "Ada" });
    const user = userEvent.setup();
    render(<QuoteForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Thanks, Ada."));
    expect(submitQuote).toHaveBeenCalledTimes(1);
    const formData = submitQuote.mock.calls[0][1] as FormData;
    expect(formData.get("email")).toBe("ada@example.com");
    expect(formData.get("company")).toBe("");
  });

  it("shows the server error message and keeps the values", async () => {
    submitQuote.mockResolvedValue({
      status: "error",
      message: "Something went wrong on our side. Please try again, or email us directly.",
      values: { fullName: "Ada Lovelace", email: "ada@example.com" },
    });
    const user = userEvent.setup();
    render(<QuoteForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send request" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Something went wrong on our side");
    expect(screen.getByLabelText("Full name")).toHaveValue("Ada Lovelace");
  });

  it("has a hidden honeypot field outside the tab order", () => {
    render(<QuoteForm />);
    const honeypot = document.querySelector<HTMLInputElement>('input[name="company"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest("[aria-hidden='true']")).not.toBeNull();
  });
});
