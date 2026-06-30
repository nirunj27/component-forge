import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AsyncSelect } from "./AsyncSelect";

describe("AsyncSelect", () => {
  it("renders without crashing", () => {
    render(<AsyncSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<AsyncSelect disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

});
