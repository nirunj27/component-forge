import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarWidget } from "./CalendarWidget";

describe("CalendarWidget", () => {
  it("renders without crashing", () => {
    render(<CalendarWidget>Hello</CalendarWidget>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
