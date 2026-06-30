import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KpiCard } from "./KpiCard";

describe("KpiCard", () => {
  it("renders without crashing", () => {
    render(<KpiCard>Hello</KpiCard>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
