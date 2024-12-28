"use client";

import Link from "next/link";
import { useState } from "react";

interface Office {
    id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    postcode: string;
    contactEmail: string;
    contactPhone: string;
    numberOfDesks: number;
    websiteUrl: string;
}

const OfficesPage = () => {


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
    const [offices, setOffices] = useState<Office[]>([
        {
            id: "123",
            name: "Phoenix",
            description: "A leading consultancy firm.",
            address: "123 Desk Lane",
            city: "New York",
            postcode: "10001",
            contactEmail: "capgemini@gmail.com",
            contactPhone: "07402205071",
            numberOfDesks: 10,
            websiteUrl: "bobs_axes.com",
        },
        {
            id: "office_456",
            name: "Mikey Innovation Office",
            description: "Tech co-working spaces.",
            address: "456 Tech Drive",
            city: "San Francisco",
            postcode: "94107",
            contactEmail: "info@techinnovators.com",
            contactPhone: "07402205072",
            numberOfDesks: 10,
            websiteUrl: "bobs_axes.com",
        },
        {
            id: "office_789",
            name: "The Old Wise Man",
            description: "Eco-friendly office solutions.",
            address: "789 Green Blvd",
            city: "Los Angeles",
            postcode: "90001",
            contactEmail: "info@greenstartups.com",
            contactPhone: "07402205073",
            numberOfDesks: 10,
            websiteUrl: "bobs_axes.com",
        },
        {
            id: "office_1337",
            name: "ScapeRune",
            description: "An out of this world office",
            address: "Morytania",
            city: "Canafis",
            postcode: "90001",
            contactEmail: "scaperune@gmail.com",
            contactPhone: "07402205073",
            numberOfDesks: 10,
            websiteUrl: "scaperune.com",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const officesPerPage = 3;

    const filteredOffices = offices.filter(
        (office) =>
            office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            office.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastOffice = currentPage * officesPerPage;

    const indexOfFirstOffice = indexOfLastOffice - officesPerPage;

    const currentOffices =
        filteredOffices.slice(
            indexOfFirstOffice,
            indexOfLastOffice
        );

    const totalPages = Math.ceil(filteredOffices.length / officesPerPage);

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Your Offices</h1>

            {/* Search and Add Office */}
            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search offices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                />
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
                    onClick={() => console.log("Navigate to Add Office Page")}
                >
                    Add New Office
                </button>
            </div>

            {/* Offices List */}
            {filteredOffices.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No offices found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentOffices.map((office) => (
                        <div
                            key={office.id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{office.name}</h2>
                                <p className="text-gray-600 text-sm">
                                    {office.description || "No description provided."}
                                </p>
                                <p className="text-sm mt-2">
                                    <strong>Address:</strong> {office.address}, {office.city}, {office.postcode}
                                </p>
                                <p className="text-sm">
                                    <strong>Email:</strong> {office.contactEmail}
                                </p>
                                <p className="text-sm">
                                    <strong>Phone:</strong> {office.contactPhone}
                                </p>
                            </div>

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
                                    <div>
                                        <ul className="space-y-1">
                                            <div>
                                                <p className="text-sm mt-2">
                                                    <strong>Number of Desks:</strong> {office.numberOfDesks}
                                                </p>
                                            </div>
                                        </ul>
                                    </div>
                                )
                            }
                            <div className="mt-2 flex gap-6">
                                <Link
                                    href={`/business/office/detailed-view`}
                                    className="text-base text-blue-600 rounded hover:text-blue-800 underline"
                                >
                                    View listing
                                </Link>
                                <button
                                    className="text-base text-red-500 rounded hover:text-red-700 underline"
                                    onClick={() => console.log("Delete Office")}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {filteredOffices.length > officesPerPage && (
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

export default OfficesPage;
