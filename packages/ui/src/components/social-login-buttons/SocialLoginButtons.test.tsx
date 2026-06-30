import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SocialLoginButtons } from "./SocialLoginButtons";

describe("SocialLoginButtons", () => {
  it("renders without crashing", () => {
    render(<SocialLoginButtons>Hello</SocialLoginButtons>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<SocialLoginButtons onClick={handleClick}>Click</SocialLoginButtons>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<SocialLoginButtons disabled>Disabled</SocialLoginButtons>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<SocialLoginButtons onClick={handleClick}>Press</SocialLoginButtons>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
