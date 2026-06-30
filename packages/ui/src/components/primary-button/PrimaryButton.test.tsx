import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrimaryButton } from "./PrimaryButton";

describe("PrimaryButton", () => {
  it("renders without crashing", () => {
    render(<PrimaryButton>Hello</PrimaryButton>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<PrimaryButton disabled>Disabled</PrimaryButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Press</PrimaryButton>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
