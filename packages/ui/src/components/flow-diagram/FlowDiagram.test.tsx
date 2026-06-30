import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlowDiagram } from "./FlowDiagram";

describe("FlowDiagram", () => {
  it("renders without crashing", () => {
    render(<FlowDiagram>Hello</FlowDiagram>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
