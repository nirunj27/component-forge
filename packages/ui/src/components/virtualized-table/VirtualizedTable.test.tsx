import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VirtualizedTable } from "./VirtualizedTable";

describe("VirtualizedTable", () => {
  it("renders without crashing", () => {
    render(<VirtualizedTable>Hello</VirtualizedTable>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<VirtualizedTable onClick={handleClick}>Click</VirtualizedTable>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
