import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  it("renders without crashing", () => {
    render(<FileUpload />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });



  it("respects disabled state", () => {
    render(<FileUpload disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<FileUpload onClick={handleClick} />);
    screen.getByRole("textbox").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
