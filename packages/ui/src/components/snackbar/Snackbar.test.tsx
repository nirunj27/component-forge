import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Snackbar } from "./Snackbar";

describe("Snackbar", () => {
  it("renders without crashing", () => {
    render(<Snackbar>Hello</Snackbar>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Snackbar onClick={handleClick}>Click</Snackbar>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
