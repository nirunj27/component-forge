import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyToClipboard } from "./CopyToClipboard";

describe("CopyToClipboard", () => {
  it("renders without crashing", () => {
    render(<CopyToClipboard>Hello</CopyToClipboard>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CopyToClipboard onClick={handleClick}>Click</CopyToClipboard>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<CopyToClipboard disabled>Disabled</CopyToClipboard>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

});
