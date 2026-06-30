import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Label } from "./Label";

describe("Label", () => {
  it("renders without crashing", () => {
    render(<Label>Hello</Label>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Label onClick={handleClick}>Click</Label>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
