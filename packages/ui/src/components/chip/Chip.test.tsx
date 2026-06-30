import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders without crashing", () => {
    render(<Chip>Hello</Chip>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Chip disabled>Disabled</Chip>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
