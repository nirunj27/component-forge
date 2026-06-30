import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Spacer } from "./Spacer";

describe("Spacer", () => {
  it("renders without crashing", () => {
    render(<Spacer>Hello</Spacer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
