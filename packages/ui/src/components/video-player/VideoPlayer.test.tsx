import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer", () => {
  it("renders without crashing", () => {
    render(<VideoPlayer>Hello</VideoPlayer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<VideoPlayer onClick={handleClick}>Click</VideoPlayer>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
