import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SplitPane } from "./SplitPane";

describe("SplitPane", () => {
  it("renders without crashing", () => {
    render(<SplitPane>Hello</SplitPane>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
