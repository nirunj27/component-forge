import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ForgotPassword } from "./ForgotPassword";

describe("ForgotPassword", () => {
  it("renders without crashing", () => {
    render(<ForgotPassword />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });





});
