import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortDropdown } from "./SortDropdown";

describe("SortDropdown", () => {
  it("renders without crashing", () => {
    render(<SortDropdown />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<SortDropdown disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

});
