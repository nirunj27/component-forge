import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChartContainer } from "./ChartContainer";

describe("ChartContainer", () => {
  it("renders without crashing", () => {
    render(<ChartContainer>Hello</ChartContainer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
