import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Section } from "./Section";

describe("Section", () => {
  it("renders without crashing", () => {
    render(<Section>Hello</Section>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
