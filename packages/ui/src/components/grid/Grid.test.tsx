import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders without crashing", () => {
    render(<Grid>Hello</Grid>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
