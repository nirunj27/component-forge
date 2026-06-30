import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimePicker } from "./TimePicker";

describe("TimePicker", () => {
  it("renders without crashing", () => {
    render(<TimePicker />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<TimePicker disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<TimePicker onClick={handleClick} />);
    screen.getByRole("textbox").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
