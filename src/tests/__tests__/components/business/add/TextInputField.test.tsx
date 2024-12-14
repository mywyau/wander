import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "@/app/business/businesses/add/components/TextInput"; // Adjust the import path if necessary

describe("TextInput Component", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    type: "text",
    id: "test-input",
    name: "testInput",
    label: "Test Label",
    value: "test value",
    onChange: mockOnChange,
    placeholder: "Enter text",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct label", () => {
    render(<TextInput {...defaultProps} />);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });

  it("renders with the correct placeholder", () => {
    render(<TextInput {...defaultProps} />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it("displays the correct value", () => {
    render(<TextInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test value");
  });

  it("triggers the onChange event handler when typing", () => {
    render(<TextInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    // expect(mockOnChange).toHaveBeenCalledWith(
    //   expect.objectContaining({ target: expect.objectContaining({ value: "new value" }) })
    // );
  });

  it("applies error styles when error is provided", () => {
    render(<TextInput {...defaultProps} error="This is an error" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-500");
    const errorMessage = screen.getByText(/this is an error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not display error styles or message when no error is provided", () => {
    render(<TextInput {...defaultProps} error={undefined} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-gray-300");
    const errorMessage = screen.queryByText(/this is an error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("renders with the correct type", () => {
    render(<TextInput {...defaultProps} type="email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });
});
