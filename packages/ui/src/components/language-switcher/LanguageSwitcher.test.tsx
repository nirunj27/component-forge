import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders without crashing", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<LanguageSwitcher disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

});
