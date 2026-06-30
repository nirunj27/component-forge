import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders without crashing", () => {
    render(<Drawer>Hello</Drawer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Drawer onClick={handleClick}>Press</Drawer>);
    screen.getByRole("dialog").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
