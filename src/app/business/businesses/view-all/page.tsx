"use client";

import Link from "next/link";
import { useState } from "react";

interface Business {
    id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    postcode: string;
    contactEmail: string;
    contactPhone: string;
    numberOfOffices: number;
    websiteUrl: string;
}

const BusinessesPage = () => {


    const [isCollapsed, setIsCollapsed] = useState(false);

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        moreDetails: false,
    });

    // Toggle collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };


    // Hardcoded data for testing
    const [businesses, setBusinesses] = useState<Business[]>([
        {
            id: "123",
            name: "Capgemini",
            description: "A leading consultancy firm.",
            address: "123 Desk Lane",
            city: "New York",
            postcode: "10001",
            contactEmail: "capgemini@gmail.com",
            contactPhone: "07402205071",
            numberOfOffices: 10,
            websiteUrl: "bobs_axes.com",
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
            numberOfOffices: 10,
            websiteUrl: "bobs_axes.com",
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
            numberOfOffices: 10,
            websiteUrl: "green_axes.com",
        },
        {
            id: "business_1337",
            name: "Blue Startups",
            description: "UN-ECO-FRIENDLY office solutions.",
            address: "789 Blue Blvd",
            city: "Los Angeles",
            postcode: "90001",
            contactEmail: "info@bluestartups.com",
            contactPhone: "07402205073",
            numberOfOffices: 1000,
            websiteUrl: "blue.com",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const businessesPerPage = 3;

    const filteredBusinesses = businesses.filter(
        (business) =>
            business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastBusiness = currentPage * businessesPerPage;

    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;

    const currentBusinesses =
        filteredBusinesses.slice(
            indexOfFirstBusiness,
            indexOfLastBusiness
        );

    const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Your Businesses</h1>

            {/* Search and Add Business */}
            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                />
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
                    onClick={() => console.log("Navigate to Add Business Page")}
                >
                    Add New Business
                </button>
            </div>

            {/* Businesses List */}
            {filteredBusinesses.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No businesses found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentBusinesses.map((business) => (
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
                                    <strong>Address:</strong> {business.address}, {business.city}, {business.postcode}
                                </p>
                                <p className="text-sm">
                                    <strong>Email:</strong> {business.contactEmail}
                                </p>
                                <p className="text-sm">
                                    <strong>Phone:</strong> {business.contactPhone}
                                </p>
                                <p className="text-sm">
                                    <strong>Web Address:</strong> {business.websiteUrl}
                                </p>
                            </div>

                            {/* Businesses Section */}

                            <button
                                onClick={() => toggleSection("moreDetails")}
                                className="flex items-center justify-between w-full font-bold text-gray-900 rounded-lg group hover:text-indigo-700 mb-1 mt-3"
                            >
                                <span className={`${isCollapsed ? "hidden" : ""}`}>More Details</span>
                                <svg
                                    className={`w-4 h-4 transform ${expandedSections.moreDetails ? "rotate-90" : ""}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            {
                                expandedSections.moreDetails && !isCollapsed && (
                                    <ul className="space-y-1">
                                        <div>
                                            <p className="text-sm mt-2">
                                                <strong>Number of Offices:</strong> {business.numberOfOffices}
                                            </p>
                                        </div>
                                    </ul>
                                )
                            }

                            <div className="mt-4 flex justify-between">
                                <Link
                                    href={`/business/businesses/office/view`}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    View Offices
                                </Link>
                                <Link
                                    href={`/business/businesses/office/edit`}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {filteredBusinesses.length > businessesPerPage && (
                <div className="flex justify-center mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusinessesPage;
