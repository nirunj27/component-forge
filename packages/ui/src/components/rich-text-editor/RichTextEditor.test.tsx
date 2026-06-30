import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  it("renders without crashing", () => {
    render(<RichTextEditor>Hello</RichTextEditor>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
