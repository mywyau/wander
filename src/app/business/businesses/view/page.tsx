"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Business {
    id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    postcode: string;
    contactEmail: string;
    contactPhone: string;
}

const BusinessesPage = () => {
    // Hardcoded fake data for testing
    const [businesses, setBusinesses] = useState<Business[]>([
        {
            id: "business_123",
            name: "Capgemini",
            description: "A leading consultancy firm.",
            address: "123 Desk Lane",
            city: "New York",
            postcode: "10001",
            contactEmail: "capgemini@gmail.com",
            contactPhone: "07402205071",
        },
        {
            id: "business_456",
            name: "Tech Innovators",
            description: "Tech co-working spaces.",
            address: "456 Tech Drive",
            city: "San Francisco",
            postcode: "94107",
            contactEmail: "info@techinnovators.com",
            contactPhone: "07402205072",
        },
        {
            id: "business_789",
            name: "Green Startups",
            description: "Eco-friendly office solutions.",
            address: "789 Green Blvd",
            city: "Los Angeles",
            postcode: "90001",
            contactEmail: "info@greenstartups.com",
            contactPhone: "07402205073",
        },
    ]);

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Your Businesses</h1>

            {businesses.length === 0 ? (
                <p>You have not added any businesses yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businesses.map((business) => (
                        <div
                            key={business.id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{business.name}</h2>
                                <p className="text-gray-600 text-sm">
                                    {business.description || "No description provided."}
                                </p>
                                <p className="text-sm mt-2">
                                    Address: {business.address}, {business.city}, {business.postcode}
                                </p>
                                <p className="text-sm">Email: {business.contactEmail}</p>
                                <p className="text-sm">Phone: {business.contactPhone}</p>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <Link
                                    href={`/businesses/${business.id}/office/view`}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    View Offices
                                </Link>
                                <Link
                                    href={`/businesses/${business.id}/edit`}
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
};

export default BusinessesPage;
