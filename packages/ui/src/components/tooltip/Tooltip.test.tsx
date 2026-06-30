import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders without crashing", () => {
    render(<Tooltip>Hello</Tooltip>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Tooltip onClick={handleClick}>Press</Tooltip>);
    screen.getByRole("dialog").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
