import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmationDialog } from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  it("renders without crashing", () => {
    render(<ConfirmationDialog>Hello</ConfirmationDialog>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ConfirmationDialog onClick={handleClick}>Press</ConfirmationDialog>);
    screen.getByRole("dialog").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
