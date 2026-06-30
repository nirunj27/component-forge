import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders without crashing", () => {
    render(<Stack>Hello</Stack>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
