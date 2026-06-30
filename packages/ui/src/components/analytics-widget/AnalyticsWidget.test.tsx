import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnalyticsWidget } from "./AnalyticsWidget";

describe("AnalyticsWidget", () => {
  it("renders without crashing", () => {
    render(<AnalyticsWidget>Hello</AnalyticsWidget>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
