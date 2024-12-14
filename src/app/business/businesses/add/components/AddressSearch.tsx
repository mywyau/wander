import { useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { BusinessAddressDetails } from '../types/BusinessAddressDetails'; // Adjust the path as needed
import AddressInput from './AddressInput';
import MapContainer from './MapContainer';

const libraries = ['places'];

// Mock data aligned with BusinessAddressDetails schema
const MOCK_ADDRESSES: BusinessAddressDetails[] = [
  {
    id: 1,
    userId: "userId_1",
    businessId: "business_1",
    businessName: "mikey corp",
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
    userId: "userId_2",
    businessId: "business_1",
    businessName: "mikey corp 2",
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
  addressDetails: Partial<BusinessAddressDetails>;
  setAddressDetails: React.Dispatch<React.SetStateAction<Partial<BusinessAddressDetails>>>;
}) => {

  const [suggestions, setSuggestions] = useState<BusinessAddressDetails[]>([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const query = e.target.value;

    // Update address field in state
    setAddressDetails(
      (prev) => ({
        ...prev,
        street: query,
      })
    );

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

  const handleSelect = (selectedAddress: BusinessAddressDetails) => {
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

      <div className="relative max-w-md mx-auto lg:w-1/2">

        <AddressInput
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
            label="City"
            placeholder=""
            value={addressDetails.city}
            onChange={(e) => setAddressDetails((prev) => ({ ...prev, city: e.target.value }))}
          />

          <AddressInput
            label="Country"
            placeholder=""
            value={addressDetails.country}
            onChange={(e) => setAddressDetails((prev) => ({ ...prev, country: e.target.value }))}
          />

          <AddressInput
            label="Postcode"
            placeholder=""
            value={addressDetails.postcode}
            onChange={(e) => setAddressDetails((prev) => ({ ...prev, postcode: e.target.value }))}
          />
        </div>
      </div>


      <MapContainer
        latitude={addressDetails.latitude}
        longitude={addressDetails.longitude}
      />

      {/* <div className="mt-4 lg:mt-0 lg:w-1/2 h-96">
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
      </div> */}
    </div>
  );
};

export default AddressSearch;
