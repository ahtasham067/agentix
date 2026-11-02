import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorPage from "@/app/error";
import GlobalError from "@/app/global-error";

const error = Object.assign(new Error("db password is hunter2"), { digest: "DIGEST123" });

describe("error pages", () => {
  it("never show the error message or digest, and log it instead", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<ErrorPage error={error} reset={() => {}} />);
    expect(screen.getByRole("heading", { name: "Something went wrong." })).toBeInTheDocument();
    expect(container.textContent).not.toContain("hunter2");
    expect(container.textContent).not.toContain("DIGEST123");
    expect(log).toHaveBeenCalledWith(error);
    log.mockRestore();
  });

  it("the global error page logs too and leaks nothing", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<GlobalError error={error} reset={() => {}} />, { container: document });
    expect(document.body.textContent).not.toContain("hunter2");
    expect(document.body.textContent).not.toContain("DIGEST123");
    expect(log).toHaveBeenCalledWith(error);
    log.mockRestore();
  });
});
