import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RoleSelector } from "./RoleSelector";

describe("RoleSelector", () => {
  it("renders without crashing", () => {
    render(<RoleSelector />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<RoleSelector disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

});
