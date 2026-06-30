import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlexLayout } from "./FlexLayout";

describe("FlexLayout", () => {
  it("renders without crashing", () => {
    render(<FlexLayout>Hello</FlexLayout>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
