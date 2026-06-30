import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfiniteScrollTable } from "./InfiniteScrollTable";

describe("InfiniteScrollTable", () => {
  it("renders without crashing", () => {
    render(<InfiniteScrollTable>Hello</InfiniteScrollTable>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<InfiniteScrollTable onClick={handleClick}>Click</InfiniteScrollTable>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
