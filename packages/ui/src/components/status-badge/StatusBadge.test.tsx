import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders without crashing", () => {
    render(<StatusBadge>Hello</StatusBadge>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<StatusBadge onClick={handleClick}>Click</StatusBadge>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
