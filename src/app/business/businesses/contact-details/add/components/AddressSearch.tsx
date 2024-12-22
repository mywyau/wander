import { useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { BusinessAddressDetails } from '../types/BusinessAddressDetails'; // Adjust the path as needed
import AddressInput from './AddressInput';
import MapContainer from './MapContainer';
import mockAddresses from '../data/MockAddressData';

const libraries = ['places'];


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
      const filteredSuggestions = mockAddresses.filter((addr) =>
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
