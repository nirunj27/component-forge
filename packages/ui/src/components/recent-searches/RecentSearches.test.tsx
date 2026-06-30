import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecentSearches } from "./RecentSearches";

describe("RecentSearches", () => {
  it("renders without crashing", () => {
    render(<RecentSearches />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<RecentSearches onClick={handleClick} />);
    await user.click(screen.getByRole("textbox"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



});
