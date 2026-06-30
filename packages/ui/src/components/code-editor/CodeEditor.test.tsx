import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodeEditor } from "./CodeEditor";

describe("CodeEditor", () => {
  it("renders without crashing", () => {
    render(<CodeEditor>Hello</CodeEditor>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
