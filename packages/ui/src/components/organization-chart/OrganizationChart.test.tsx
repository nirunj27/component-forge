import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrganizationChart } from "./OrganizationChart";

describe("OrganizationChart", () => {
  it("renders without crashing", () => {
    render(<OrganizationChart>Hello</OrganizationChart>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
