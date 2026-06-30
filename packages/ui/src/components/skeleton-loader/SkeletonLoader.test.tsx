import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkeletonLoader } from "./SkeletonLoader";

describe("SkeletonLoader", () => {
  it("renders without crashing", () => {
    render(<SkeletonLoader>Hello</SkeletonLoader>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<SkeletonLoader onClick={handleClick}>Click</SkeletonLoader>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
