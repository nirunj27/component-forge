import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./RegisterForm";

describe("RegisterForm", () => {
  it("renders without crashing", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });





});
