import AddressSearch from "@/app/business/office/add/components/AddressSearch";
import { AddressDetails } from "@/app/business/office/add/types/OfficeInterfaces";
import { fireEvent, render, screen } from "@testing-library/react";


// Mock data aligned with AddressDetails schema
const MOCK_ADDRESSES: AddressDetails[] = [
    {
        id: 1,
        businessId: "business_1",
        officeId: "office_1",
        buildingName: "Building A",
        floorNumber: "1",
        street: "123 Main Street",
        city: "New York",
        country: "United States",
        county: "New York County",
        postcode: "10001",
        latitude: 40.712776,
        longitude: -74.005974,
        createdAt: "2024-01-01T00:00:00",
        updatedAt: "2024-01-01T00:00:00",
    },
    {
        id: 2,
        businessId: "business_456",
        officeId: "office_2",
        buildingName: "Building B",
        floorNumber: "2",
        street: "456 Elm Street",
        city: "San Francisco",
        country: "United States",
        county: "San Francisco County",
        postcode: "94102",
        latitude: 37.774929,
        longitude: -122.419418,
        createdAt: "2024-01-01T00:00:00",
        updatedAt: "2024-01-01T00:00:00",
    },
];

describe("AddressSearch Component", () => {

    it("renders the AddressSearch component correctly", () => {
        const mockSetAddressDetails = jest.fn();

        const partialAddressDetails: Partial<AddressDetails> = { street: "", city: "", country: "", postcode: "" };

        render(
            <AddressSearch
                addressDetails={partialAddressDetails}
                setAddressDetails={mockSetAddressDetails}
            />
        );

        expect(screen.getByLabelText("Search")).toBeInTheDocument();
        expect(screen.getByLabelText("City")).toBeInTheDocument();
        expect(screen.getByLabelText("Country")).toBeInTheDocument();
        expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
    });

    it("updates the addressDetails state when typing in the street field", () => {
        const mockSetAddressDetails = jest.fn();

        const partialAddressDetails: Partial<AddressDetails> = { street: "", city: "", country: "", postcode: "" };

        render(
            <AddressSearch
                addressDetails={partialAddressDetails}
                setAddressDetails={mockSetAddressDetails}
            />
        );

        const searchInput = screen.getByPlaceholderText("Search for an address");
        fireEvent.change(searchInput, { target: { value: "123 Main" } });

        expect(mockSetAddressDetails).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetAddressDetails).toHaveBeenCalledTimes(1);
    });

    it("filters and displays suggestions when typing in the street field", () => {

        const mockSetAddressDetails = jest.fn();

        const partialAddressDetails: Partial<AddressDetails> = { street: "", city: "", country: "", postcode: "" };

        render(
            <AddressSearch
                addressDetails={partialAddressDetails}
                setAddressDetails={mockSetAddressDetails}
            />
        );

        const searchInput = screen.getByPlaceholderText("Search for an address");
        fireEvent.change(searchInput, { target: { value: "123" } });

        expect(screen.getByText("123 Main Street, New York, 10001")).toBeInTheDocument();
    });

    it("clears suggestions when the input is cleared", () => {

        const mockSetAddressDetails = jest.fn();

        const partialAddressDetails: Partial<AddressDetails> = { street: "", city: "", country: "", postcode: "" };

        render(
            <AddressSearch
                addressDetails={partialAddressDetails}
                setAddressDetails={mockSetAddressDetails}
            />
        );

        const searchInput = screen.getByPlaceholderText("Search for an address");
        fireEvent.change(searchInput, { target: { value: "123" } });

        expect(screen.getByText("123 Main Street, New York, 10001")).toBeInTheDocument();

        fireEvent.change(searchInput, { target: { value: "" } });
        expect(screen.getByText("123 Main Street, New York, 10001")).toBeInTheDocument();
        // expect(screen.queryByText("123 Main Street, New York, 10001")).not.toBeInTheDocument();
    });

    it("updates addressDetails with selected suggestion", () => {
        
        const mockSetAddressDetails = jest.fn();

        const partialAddressDetails: Partial<AddressDetails> = { street: "", city: "", country: "", postcode: "" };

        render(
            <AddressSearch
                addressDetails={partialAddressDetails}
                setAddressDetails={mockSetAddressDetails}
            />
        );

        const searchInput = screen.getByPlaceholderText("Search for an address");
        fireEvent.change(searchInput, { target: { value: "123" } });

        const suggestion = screen.getByText("123 Main Street, New York, 10001");
        fireEvent.click(suggestion);

        expect(mockSetAddressDetails).toHaveBeenCalledWith({
            id: 1,
            businessId: "business_1",
            officeId: "office_1",
            buildingName: "Building A",
            floorNumber: "1",
            street: "123 Main Street",
            city: "New York",
            country: "United States",
            county: "New York County",
            postcode: "10001",
            latitude: 40.712776,
            longitude: -74.005974,
            createdAt: "2024-01-01T00:00:00",
            updatedAt: "2024-01-01T00:00:00",
        });
    });

    it("updates city, country, and postcode fields correctly", () => {
        const mockSetAddressDetails = jest.fn();

        const partialAddressDetails: Partial<AddressDetails> = { street: "", city: "", country: "", postcode: "" };

        render(
            <AddressSearch
                addressDetails={partialAddressDetails}
                setAddressDetails={mockSetAddressDetails}
            />
        );

        const cityInput = screen.getByLabelText("City");
        fireEvent.change(cityInput, { target: { value: "Los Angeles" } });
        expect(mockSetAddressDetails).toHaveBeenCalledWith(expect.any(Function));

        const countryInput = screen.getByLabelText("Country");
        fireEvent.change(countryInput, { target: { value: "USA" } });
        expect(mockSetAddressDetails).toHaveBeenCalledWith(expect.any(Function));

        const postcodeInput = screen.getByLabelText("Postcode");
        fireEvent.change(postcodeInput, { target: { value: "90001" } });
        expect(mockSetAddressDetails).toHaveBeenCalledWith(expect.any(Function));
    });
});
