import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddBusinessButton from "@/app/business/businesses/add/components/AddBusinessButton"; // Adjust the import path if necessary

describe("AddBusinessButton", () => {
  it("renders with the correct label", () => {
    render(<AddBusinessButton label="Add Business" />);
    const button = screen.getByRole("button", { name: /add business/i });
    expect(button).toBeInTheDocument();
  });

  it("has the correct type when provided", () => {
    render(<AddBusinessButton label="Submit" type="submit" />);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("defaults to type 'button' if not specified", () => {
    render(<AddBusinessButton label="Default Button" />);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies custom className if provided", () => {
    render(
      <AddBusinessButton
        label="Custom Styled Button"
        className="custom-class"
      />
    );
    const button = screen.getByRole("button", { name: /custom styled button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("triggers the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<AddBusinessButton label="Clickable Button" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /clickable button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the 'disabled' prop is true", () => {
    render(<AddBusinessButton label="Disabled Button" disabled />);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50 cursor-not-allowed");
  });

  it("does not trigger onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <AddBusinessButton label="Disabled Click" onClick={handleClick} disabled />
    );
    const button = screen.getByRole("button", { name: /disabled click/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
