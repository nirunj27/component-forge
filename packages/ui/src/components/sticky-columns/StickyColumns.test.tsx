import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StickyColumns } from "./StickyColumns";

describe("StickyColumns", () => {
  it("renders without crashing", () => {
    render(<StickyColumns>Hello</StickyColumns>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<StickyColumns onClick={handleClick}>Click</StickyColumns>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
