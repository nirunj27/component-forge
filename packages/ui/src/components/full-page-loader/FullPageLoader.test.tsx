import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FullPageLoader } from "./FullPageLoader";

describe("FullPageLoader", () => {
  it("renders without crashing", () => {
    render(<FullPageLoader>Hello</FullPageLoader>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });





  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<FullPageLoader onClick={handleClick}>Press</FullPageLoader>);
    screen.getByRole("dialog").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
