import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpandableRows } from "./ExpandableRows";

describe("ExpandableRows", () => {
  it("renders without crashing", () => {
    render(<ExpandableRows>Hello</ExpandableRows>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ExpandableRows onClick={handleClick}>Click</ExpandableRows>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
