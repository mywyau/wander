import AddressInput from "@/app/business/businesses/[business_id]/office/add/components/AddressInput";
import "@testing-library/jest-dom"; // For additional matchers
import { fireEvent, render, screen } from "@testing-library/react";

describe("AddressInput Component", () => {
    test("renders the label and input with correct props", () => {
        render(
            <AddressInput
                label="Street"
                placeholder="Enter street address"
                value="123 Main St"
                onChange={() => { }}
            />
        );

        const labelElement = screen.getByText("Street");
        const inputElement = screen.getByPlaceholderText("Enter street address");

        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("123 Main St");
    });

    test("displays the correct placeholder", () => {
        render(
            <AddressInput
                label="City"
                placeholder="Enter city name"
                value=""
                onChange={() => { }}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter city name");

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("placeholder", "Enter city name");
    });

    test("calls the onChange handler when typing", () => {
        const mockOnChange = jest.fn();
        render(
            <AddressInput
                label="City"
                placeholder="Enter city name"
                value=""
                onChange={mockOnChange}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter city name");
        fireEvent.change(inputElement, { target: { value: "New York" } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object)); // Ensure event object is passed
    });

    test("renders with the correct input type", () => {
        render(
            <AddressInput
                label="Zip Code"
                placeholder="Enter zip code"
                value="12345"
                onChange={() => { }}
                type="number"
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter zip code");

        expect(inputElement).toHaveAttribute("type", "number");
        expect(inputElement).toHaveValue(12345);
    });

    test("applies additional custom styles via className", () => {
        render(
            <AddressInput
                label="State"
                placeholder="Enter state"
                value=""
                onChange={() => { }}
                className="custom-class"
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter state");

        expect(inputElement).toHaveClass("custom-class");
    });

    test("displays an empty string when value is undefined", () => {
        render(
            <AddressInput
                label="Country"
                placeholder="Enter country"
                value={undefined}
                onChange={() => { }}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter country");

        expect(inputElement).toHaveValue(""); // Defaults to an empty string
    });
});
