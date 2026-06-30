import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PermissionMatrix } from "./PermissionMatrix";

describe("PermissionMatrix", () => {
  it("renders without crashing", () => {
    render(<PermissionMatrix>Hello</PermissionMatrix>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<PermissionMatrix onClick={handleClick}>Click</PermissionMatrix>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
