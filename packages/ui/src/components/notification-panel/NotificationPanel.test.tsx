import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationPanel } from "./NotificationPanel";

describe("NotificationPanel", () => {
  it("renders without crashing", () => {
    render(<NotificationPanel>Hello</NotificationPanel>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<NotificationPanel onClick={handleClick}>Click</NotificationPanel>);
    await user.click(screen.getByRole("status"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
