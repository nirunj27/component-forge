import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivityFeed } from "./ActivityFeed";

describe("ActivityFeed", () => {
  it("renders without crashing", () => {
    render(<ActivityFeed>Hello</ActivityFeed>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





});
