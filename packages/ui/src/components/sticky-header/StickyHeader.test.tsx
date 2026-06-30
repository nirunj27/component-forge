import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StickyHeader } from "./StickyHeader";

describe("StickyHeader", () => {
  it("renders without crashing", () => {
    render(<StickyHeader>Hello</StickyHeader>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<StickyHeader onClick={handleClick}>Click</StickyHeader>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
