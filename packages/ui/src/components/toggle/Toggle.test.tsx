import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders without crashing", () => {
    render(<Toggle>Hello</Toggle>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Toggle disabled>Disabled</Toggle>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
