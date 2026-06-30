import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LazyImageLoader } from "./LazyImageLoader";

describe("LazyImageLoader", () => {
  it("renders without crashing", () => {
    render(<LazyImageLoader>Hello</LazyImageLoader>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<LazyImageLoader onClick={handleClick}>Click</LazyImageLoader>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
