import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServerPagination } from "./ServerPagination";

describe("ServerPagination", () => {
  it("renders without crashing", () => {
    render(<ServerPagination>Hello</ServerPagination>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ServerPagination onClick={handleClick}>Click</ServerPagination>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
