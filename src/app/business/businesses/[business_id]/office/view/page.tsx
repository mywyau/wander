"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";


interface Office {
    id: string;
    name: string;
    address: string;
    city: string;
    postcode: string;
    floors: number;
    totalDesks: number;
    amenities: string[];
    contactEmail: string;
    contactPhone: string;
}

export default function OfficesPage() {
    const params = useParams();
    const business_id = params.business_id;

    const businessName = "Capgemini"; // Replace with API call to fetch business details

    // Hardcoded offices data
    const [offices, setOffices] = useState<Office[]>([
        {
            id: "office_001",
            name: "Capgemini HQ",
            address: "123 Desk Lane",
            city: "New York",
            postcode: "10001",
            floors: 5,
            totalDesks: 50,
            amenities: ["Wi-Fi", "Coffee", "Power Outlets", "Air Conditioning"],
            contactEmail: "hq@capgemini.com",
            contactPhone: "07402205071",
        },
        {
            id: "office_002",
            name: "Capgemini West Wing",
            address: "456 West Street",
            city: "San Francisco",
            postcode: "94107",
            floors: 3,
            totalDesks: 30,
            amenities: ["Wi-Fi", "Conference Rooms", "Monitor", "Standing Desks"],
            contactEmail: "westwing@capgemini.com",
            contactPhone: "07402205072",
        },
    ]);

    if (!business_id) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">
                Offices for {businessName} (ID: {business_id})
            </h1>

            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                    {offices.length} offices found.
                </p>
                <Link
                    href={`/business/businesses/${business_id}/office/add`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add New Office
                </Link>
            </div>

            {offices.length === 0 ? (
                <p>No offices have been added for this business yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offices.map((office) => (
                        <div
                            key={office.id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {office.name}
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                    Address: {office.address}, {office.city},{" "}
                                    {office.postcode}
                                </p>
                                <p className="text-sm mt-2">
                                    Floors: {office.floors}
                                </p>
                                <p className="text-sm">
                                    Total Desks: {office.totalDesks}
                                </p>
                                <p className="text-sm mt-2">
                                    Amenities:{" "}
                                    {office.amenities.join(", ") || "None"}
                                </p>
                                <p className="text-sm mt-2">
                                    Email: {office.contactEmail}
                                </p>
                                <p className="text-sm">Phone: {office.contactPhone}</p>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <Link
                                    href={`/businesses/${business_id}/office/${office.id}/desk/view`}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    View Desks
                                </Link>
                                <Link
                                    href={`/businesses/${business_id}/offices/${office.id}/edit`}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
