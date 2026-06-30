import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResponsiveWrapper } from "./ResponsiveWrapper";

describe("ResponsiveWrapper", () => {
  it("renders without crashing", () => {
    render(<ResponsiveWrapper>Hello</ResponsiveWrapper>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
