import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CountdownTimer } from "./CountdownTimer";

describe("CountdownTimer", () => {
  it("renders without crashing", () => {
    render(<CountdownTimer>Hello</CountdownTimer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CountdownTimer onClick={handleClick}>Click</CountdownTimer>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<CountdownTimer disabled>Disabled</CountdownTimer>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

});
