import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResetPassword } from "./ResetPassword";

describe("ResetPassword", () => {
  it("renders without crashing", () => {
    render(<ResetPassword />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });





});
