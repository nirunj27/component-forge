import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuditTimeline } from "./AuditTimeline";

describe("AuditTimeline", () => {
  it("renders without crashing", () => {
    render(<AuditTimeline>Hello</AuditTimeline>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AuditTimeline onClick={handleClick}>Click</AuditTimeline>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
