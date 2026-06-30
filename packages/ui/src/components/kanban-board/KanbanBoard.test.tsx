import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KanbanBoard } from "./KanbanBoard";

describe("KanbanBoard", () => {
  it("renders without crashing", () => {
    render(<KanbanBoard>Hello</KanbanBoard>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
