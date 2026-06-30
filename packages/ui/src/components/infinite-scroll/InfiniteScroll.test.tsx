import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfiniteScroll } from "./InfiniteScroll";

describe("InfiniteScroll", () => {
  it("renders without crashing", () => {
    render(<InfiniteScroll>Hello</InfiniteScroll>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<InfiniteScroll onClick={handleClick}>Click</InfiniteScroll>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<InfiniteScroll disabled>Disabled</InfiniteScroll>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

});
