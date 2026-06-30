import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("renders without crashing", () => {
    render(<Radio>Hello</Radio>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Radio disabled>Disabled</Radio>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
