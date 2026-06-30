import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelect } from "./MultiSelect";

describe("MultiSelect", () => {
  it("renders without crashing", () => {
    render(<MultiSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<MultiSelect disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

});
