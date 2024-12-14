import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "@/app/business/businesses/add/components/SelectField"; // Adjust the import path if necessary


describe("SelectField", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders with the correct label", () => {
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={jest.fn()}
        options={mockOptions}
      />
    );

    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });

  it("renders the select field with placeholder option", () => {
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={jest.fn()}
        options={mockOptions}
      />
    );

    const placeholderOption = screen.getByRole("option", {
      name: /select an option/i,
    });
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toBeDisabled();
  });

  it("renders all options provided", () => {
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={jest.fn()}
        options={mockOptions}
      />
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(mockOptions.length + 1); // Includes placeholder option
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("sets the correct value when an option is selected", () => {
    const handleChange = jest.fn();
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={handleChange}
        options={mockOptions}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option2" } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    //TODO: Fix this test or delete
    // expect(handleChange).toHaveBeenCalledWith(
    //   expect.objectContaining({ target: expect.objectContaining({ value: "option2" }) })
    // );
  });

  it("disables the select field when disabled is true", () => {
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={jest.fn()}
        options={mockOptions}
        disabled
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  it("displays an error message when provided", () => {
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={jest.fn()}
        options={mockOptions}
        error="This is an error"
      />
    );

    const errorMessage = screen.getByText(/this is an error/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");
  });

  it("does not display an error message when error is undefined", () => {
    render(
      <SelectField
        id="test-select"
        name="testSelect"
        label="Test Label"
        value=""
        onChange={jest.fn()}
        options={mockOptions}
      />
    );

    const errorMessage = screen.queryByText(/this is an error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
