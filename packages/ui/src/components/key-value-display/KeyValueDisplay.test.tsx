import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KeyValueDisplay } from "./KeyValueDisplay";

describe("KeyValueDisplay", () => {
  it("renders without crashing", () => {
    render(<KeyValueDisplay>Hello</KeyValueDisplay>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<KeyValueDisplay onClick={handleClick}>Click</KeyValueDisplay>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
