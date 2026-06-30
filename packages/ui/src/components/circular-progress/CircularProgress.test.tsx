import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CircularProgress } from "./CircularProgress";

describe("CircularProgress", () => {
  it("renders without crashing", () => {
    render(<CircularProgress>Hello</CircularProgress>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CircularProgress onClick={handleClick}>Click</CircularProgress>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
