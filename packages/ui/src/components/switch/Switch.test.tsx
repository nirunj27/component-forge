import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders without crashing", () => {
    render(<Switch>Hello</Switch>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Switch disabled>Disabled</Switch>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
