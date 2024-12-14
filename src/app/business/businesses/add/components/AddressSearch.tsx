import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { AddressDetails } from '../types/BusinessInterfaces'; // Adjust the path as needed

const libraries = ['places'];

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
    createdAt: new Date().toISOString().slice(0, 19),
    updatedAt: new Date().toISOString().slice(0, 19),
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
    createdAt: new Date().toISOString().slice(0, 19),
    updatedAt: new Date().toISOString().slice(0, 19),
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

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });

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

  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      {/* Address Search */}
      <div className="relative max-w-md mx-auto lg:w-1/2">
        <label className="block text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          placeholder="Search for an address"
          value={addressDetails.street || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={addressDetails.city || ""}
              onChange={(e) => setAddressDetails((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              value={addressDetails.country || ""}
              onChange={(e) => setAddressDetails((prev) => ({ ...prev, country: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postcode</label>
            <input
              type="text"
              value={addressDetails.postcode || ""}
              onChange={(e) => setAddressDetails((prev) => ({ ...prev, postcode: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-4 lg:mt-0 lg:w-1/2 h-96">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={addressDetails.latitude && addressDetails.longitude ? 14 : 4}
          center={
            addressDetails.latitude && addressDetails.longitude
              ? { lat: addressDetails.latitude, lng: addressDetails.longitude }
              : { lat: 39.8283, lng: -98.5795 } // Default center (USA)
          }
        >
          {addressDetails.latitude && addressDetails.longitude && (
            <Marker position={{ lat: addressDetails.latitude, lng: addressDetails.longitude }} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default AddressSearch;
