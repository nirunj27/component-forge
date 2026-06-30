import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders without crashing", () => {
    render(<Progress>Hello</Progress>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Progress disabled>Disabled</Progress>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
