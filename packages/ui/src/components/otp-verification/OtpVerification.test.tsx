import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OtpVerification } from "./OtpVerification";

describe("OtpVerification", () => {
  it("renders without crashing", () => {
    render(<OtpVerification />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });





});
