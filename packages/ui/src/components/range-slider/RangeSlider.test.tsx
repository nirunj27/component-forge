import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RangeSlider } from "./RangeSlider";

describe("RangeSlider", () => {
  it("renders without crashing", () => {
    render(<RangeSlider />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<RangeSlider disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<RangeSlider onClick={handleClick} />);
    screen.getByRole("textbox").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
