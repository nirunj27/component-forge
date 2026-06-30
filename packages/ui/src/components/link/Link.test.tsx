import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link } from "./Link";

describe("Link", () => {
  it("renders without crashing", () => {
    render(<Link>Hello</Link>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<Link disabled>Disabled</Link>);
    expect(screen.getByRole("status")).toBeDisabled();
  });

});
