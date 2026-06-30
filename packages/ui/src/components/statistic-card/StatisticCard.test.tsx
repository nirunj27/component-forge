import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StatisticCard } from "./StatisticCard";

describe("StatisticCard", () => {
  it("renders without crashing", () => {
    render(<StatisticCard>Hello</StatisticCard>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
