import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from "@/app/business/businesses/add/components/TextArea"; // Adjust the import path as necessary

describe("TextArea Component", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    id: "test-textarea",
    name: "description",
    label: "Description",
    value: "Initial value",
    onChange: mockOnChange,
    placeholder: "Enter a description",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct label", () => {
    render(<TextArea {...defaultProps} />);
    const label = screen.getByText(/description/i);
    expect(label).toBeInTheDocument();
  });

  it("renders with the correct placeholder", () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter a description/i);
    expect(textarea).toBeInTheDocument();
  });

  it("displays the correct initial value", () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Initial value");
  });

  it("triggers onChange handler when typing", () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Updated value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("renders without error by default", () => {
    render(<TextArea {...defaultProps} />);
    const errorMessage = screen.queryByText(/error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
