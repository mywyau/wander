"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Desk {
  id: number;
  name: string;
  price: number;
  address: string;
  city: string;
  country: string;
  postcode: string | null;
  coordinates: { lat: number; lng: number }; // latitude and longitude
  imageUrl: string; // Add imageUrl property
}

const desks: Desk[] = [
  { id: 1, name: "Office 1", price: 25, address: "1 Bob Street", city: "New York City", country: "United States", postcode: null, coordinates: { lat: 40.7128, lng: -74.006 }, imageUrl: "./images/pepe_house.jpg" },
  { id: 2, name: "Office 2", price: 30, address: "1 Bob Street", city: "New York City", country: "United States", postcode: null, coordinates: { lat: 40.73061, lng: -73.935242 }, imageUrl: "./images/pepe_house.jpg" },
  { id: 3, name: "Desk 3", price: 20, address: "1 Bob Street", city: "Los Angeles", country: "United States", postcode: null, coordinates: { lat: 34.0522, lng: -118.2437 }, imageUrl: "./images/pepe_house.jpg" },
  { id: 4, name: "Desk 4", price: 35, address: "1 Bob Street", city: "London", country: "United Kingdom", postcode: "CF3 3NJ", coordinates: { lat: 51.5074, lng: -0.1276 }, imageUrl: "./images/pepe_house.jpg" },
  { id: 5, name: "Desk 5", price: 100, address: "1 Bob Street", city: "London", country: "United Kingdom", postcode: "CF3 3NJ", coordinates: { lat: 51.5074, lng: -0.1276 }, imageUrl: "./images/pepe_house.jpg" },
  { id: 6, name: "Office 6", price: 20, address: "1 Bob Street", city: "London", country: "United Kingdom", postcode: "CF3 3NJ", coordinates: { lat: 51.5074, lng: -0.1276 }, imageUrl: "./images/pepe_house.jpg" },
  { id: 7, name: "Cafe House 7", price: 35, address: "1 Bob Street", city: "London", country: "United Kingdom", postcode: "CF3 3NJ", coordinates: { lat: 51.5074, lng: -0.1276 }, imageUrl: "./images/pepe_house.jpg" },
];


export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [filteredDesks, setFilteredDesks] = useState<Desk[]>([]);
  const locationQuery = searchParams.get("location")?.toLowerCase() || "";

  useEffect(() => {
    if (locationQuery) {
      const filtered = desks.filter((desk) =>
        desk.city.toLowerCase().includes(locationQuery)
      );
      setFilteredDesks(filtered);
    }
  }, [locationQuery]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Search Results for "{locationQuery}"
        </h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesks.length > 0 ? (
            filteredDesks.map((desk) => (
              <li key={desk.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                <img src={desk.imageUrl} alt={desk.name} className="w-full h-100 object-cover rounded-t-lg mb-4" />
                <h2 className="text-xl font-semibold mb-2">{desk.name}</h2>
                <p className="text-gray-700">
                  <span className="font-medium">From £{desk.price}</span> per day
                </p>
                <p className="text-gray-700 mb-4">{desk.address}</p>
                <p className="text-gray-700 mb-4">{desk.postcode}</p>
                <p className="text-gray-700 mb-4">{desk.city}</p>

                {/* Center the Book Now button */}
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="w-2/3 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-center"
                  >
                    <Link href={`/book/${desk.id}`} className="block w-full h-full">
                      Book Now
                    </Link>
                  </button>
                </div>

              </li>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No desks found for "{locationQuery}"
            </p>
          )}
        </ul>
      </div>
    </main>
  );
}
