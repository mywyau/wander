import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

// Mock data
const MOCK_ADDRESSES = [
  {
    address: "123 Main Street, New York, NY, USA",
    street: "123 Main Street",
    city: "New York",
    country: "United States",
    postcode: "10001",
    location: { lat: 40.712776, lng: -74.005974 },
  },
  {
    address: "456 Elm Street, San Francisco, CA, USA",
    street: "456 Elm Street",
    city: "San Francisco",
    country: "United States",
    postcode: "94102",
    location: { lat: 37.774929, lng: -122.419418 },
  },
  {
    address: "789 Pine Avenue, Chicago, IL, USA",
    street: "789 Pine Avenue",
    city: "Chicago",
    country: "United States",
    postcode: "60611",
    location: { lat: 41.878113, lng: -87.629799 },
  },
  {
    address: "321 Maple Lane, Austin, TX, USA",
    street: "321 Maple Lane",
    city: "Austin",
    country: "United States",
    postcode: "73301",
    location: { lat: 30.267153, lng: -97.743057 },
  },
];

const AddressSearchWithMap = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postcode, setPostcode] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  const handleInputChange = (e) => {
    const query = e.target.value;
    setAddress(query);

    // Filter mock data based on input
    if (query.length > 0) {
      const filteredSuggestions = MOCK_ADDRESSES.filter((addr) =>
        addr.address.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress.address);
    setStreet(selectedAddress.street);
    setCity(selectedAddress.city);
    setCountry(selectedAddress.country);
    setPostcode(selectedAddress.postcode);
    setSelectedLocation(selectedAddress.location);
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
          value={address}
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
                {suggestion.address}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postcode</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-4 lg:mt-0 lg:w-1/2 h-96">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={selectedLocation ? 14 : 4}
          center={selectedLocation || { lat: 39.8283, lng: -98.5795 }} // Default center (USA)
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default AddressSearchWithMap;
