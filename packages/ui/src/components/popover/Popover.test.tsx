import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders without crashing", () => {
    render(<Popover>Hello</Popover>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Popover onClick={handleClick}>Press</Popover>);
    screen.getByRole("dialog").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
