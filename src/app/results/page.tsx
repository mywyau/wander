"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

// Define the Desk interface
interface Desk {
  id: number;
  name: string;
  price: number;
  address: string;
  city: string;
  country: string;
  postcode: string | null;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
}

// Desk data
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
  const [loading, setLoading] = useState(true); // Add loading state
  const locationQuery = searchParams.get("location")?.toLowerCase() || "";

  const h1SearchTermContent = searchParams.get("location")

  useEffect(() => {
    if (locationQuery) {
      setLoading(true); // Start loading
      const filtered = desks.filter((desk) =>
        desk.city.toLowerCase().includes(locationQuery)
      );
      setFilteredDesks(filtered);

      setTimeout(() => {
        const filtered = desks.filter((desk) =>
          desk.city.toLowerCase().includes(locationQuery)
        );
        setFilteredDesks(filtered);
        setLoading(false); // Stop loading after delay
      }, 250); // 1-second delay
    }
  }, [locationQuery]);
  return (
    <main className="min-h-screen p-6 grid neobrutalist-bg">
      {/* Show loading state while waiting */}
      {loading ? (
        <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">
          Loading results...
        </p>
      ) : (
        <div className="container mx-auto">

          {/* Header section */}
          <div className="text-left w-full max-w-4xl">

            {/* Breadcrumb Navigation */}
            <div className="mb-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/wander" className="hover:text-blue-800">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/wander/results/?location=${locationQuery}`} className="hover:text-blue-800">
                      Search Results
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-black">
              Search Results for "{locationQuery}"
            </h1>

          </div>

          {/* Grid Container for Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredDesks.map((desk) => (
              <Card key={desk.id} className="p-1 bg-main border-4 border-black hover:bg-softBlue transition-all">
                <CardHeader className="relative">
                  <img
                    src={desk.imageUrl}
                    alt={desk.name}
                    className="w-full h-70 object-cover rounded-lg border-2 border-black"
                  />
                  <h2 className="text-xl font-bold text-black mt-3">{desk.name}</h2>
                </CardHeader>
                <CardContent className="text-black space-y-2">
                  <p><span className="font-semibold">From £{desk.price}</span> per day</p>
                  <p className="text-black">{desk.address}</p>
                  <p className="text-black">{desk.postcode}</p>
                  <p className="text-black">{desk.city}</p>
                </CardContent>
                <CardFooter className="flex justify-center space-x-6">
                  <Button variant="green" className="w-full text-black hover:bg-softGreen">
                    <Link href={`/book/${desk.id}`} className="w-full h-full block">Book Now</Link>
                  </Button>
                  <Button variant="yellow" className="w-full text-black hover:bg-softYellow">
                    <Link href={`/book/${desk.id}`} className="w-full h-full block">More information</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </div>
      )}
    </main>
  );

}
