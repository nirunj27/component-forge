import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingButton } from "./LoadingButton";

describe("LoadingButton", () => {
  it("renders without crashing", () => {
    render(<LoadingButton>Hello</LoadingButton>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<LoadingButton onClick={handleClick}>Click</LoadingButton>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<LoadingButton disabled>Disabled</LoadingButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<LoadingButton onClick={handleClick}>Press</LoadingButton>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
