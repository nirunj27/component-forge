import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pill } from "./Pill";

describe("Pill", () => {
  it("renders without crashing", () => {
    render(<Pill>Hello</Pill>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Pill disabled>Disabled</Pill>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
