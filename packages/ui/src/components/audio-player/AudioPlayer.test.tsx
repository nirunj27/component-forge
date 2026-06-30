import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AudioPlayer } from "./AudioPlayer";

describe("AudioPlayer", () => {
  it("renders without crashing", () => {
    render(<AudioPlayer>Hello</AudioPlayer>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AudioPlayer onClick={handleClick}>Click</AudioPlayer>);
    await user.click(screen.getByRole("region"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
