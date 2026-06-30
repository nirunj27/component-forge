import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("renders without crashing", () => {
    render(<Rating>Hello</Rating>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Rating onClick={handleClick}>Click</Rating>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
