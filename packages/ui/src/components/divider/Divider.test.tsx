import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders without crashing", () => {
    render(<Divider>Hello</Divider>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
