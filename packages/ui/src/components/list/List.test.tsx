import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { List } from "./List";

describe("List", () => {
  it("renders without crashing", () => {
    render(<List>Hello</List>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<List onClick={handleClick}>Click</List>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
