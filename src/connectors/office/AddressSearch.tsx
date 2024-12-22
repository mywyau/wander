import React, { useState } from "react";
import { AddressDetails } from "../types/OfficeContactDetails"; // Adjust the path as needed
import AddressInput from "./AddressInput";

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

const AddressSearch = ({
  addressDetails,
  setAddressDetails,
}: {
  addressDetails: Partial<AddressDetails>;
  setAddressDetails: React.Dispatch<React.SetStateAction<Partial<AddressDetails>>>;
}) => {
  const [suggestions, setSuggestions] = useState<AddressDetails[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // Update address field in state
    setAddressDetails((prev) => ({
      ...prev,
      street: query,
    }));

    // Filter mock data based on input
    if (query.length > 0) {
      const filteredSuggestions = MOCK_ADDRESSES.filter((addr) =>
        addr.street.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (selectedAddress: AddressDetails) => {
    // Update all fields in address details
    setAddressDetails({
      ...selectedAddress,
    });
    setSuggestions([]);
  };

  return (
    <div className="relative max-w-md mx-auto lg:w-1/2">
      <AddressInput
        id="search"
        label="Search"
        placeholder="Search for an address"
        value={addressDetails.street}
        onChange={handleInputChange}
      />

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {suggestion.street}, {suggestion.city}, {suggestion.postcode}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 space-y-4">
        <AddressInput
          id="city"
          label="City"
          placeholder=""
          value={addressDetails.city}
          onChange={(e) => setAddressDetails((prev) => ({ ...prev, city: e.target.value }))}
        />

        <AddressInput
          id="country"
          label="Country"
          placeholder=""
          value={addressDetails.country}
          onChange={(e) => setAddressDetails((prev) => ({ ...prev, country: e.target.value }))}
        />

        <AddressInput
          id="postcode"
          label="Postcode"
          placeholder=""
          value={addressDetails.postcode}
          onChange={(e) => setAddressDetails((prev) => ({ ...prev, postcode: e.target.value }))}
        />
      </div>
    </div>
  );
};

export default AddressSearch;
