import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

describe("Select", () => {
  it("renders without crashing", () => {
    render(<Select />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Select disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

});
