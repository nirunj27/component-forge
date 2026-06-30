import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutoComplete } from "./AutoComplete";

describe("AutoComplete", () => {
  it("renders without crashing", () => {
    render(<AutoComplete />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AutoComplete onClick={handleClick} />);
    await user.click(screen.getByRole("textbox"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
