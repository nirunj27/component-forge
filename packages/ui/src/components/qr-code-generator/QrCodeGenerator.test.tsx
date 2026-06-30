import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QrCodeGenerator } from "./QrCodeGenerator";

describe("QrCodeGenerator", () => {
  it("renders without crashing", () => {
    render(<QrCodeGenerator>Hello</QrCodeGenerator>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<QrCodeGenerator onClick={handleClick}>Click</QrCodeGenerator>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<QrCodeGenerator disabled>Disabled</QrCodeGenerator>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

});
