import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecentActivity } from "./RecentActivity";

describe("RecentActivity", () => {
  it("renders without crashing", () => {
    render(<RecentActivity>Hello</RecentActivity>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
