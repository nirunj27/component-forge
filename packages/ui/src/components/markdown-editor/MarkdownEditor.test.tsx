import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MarkdownEditor } from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  it("renders without crashing", () => {
    render(<MarkdownEditor>Hello</MarkdownEditor>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
