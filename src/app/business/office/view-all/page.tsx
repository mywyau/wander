"use client";

import OfficeListingController from "@/controllers/office/OfficeListingController";
import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { OfficeListing } from "@/types/office/OfficeListing";
import Link from "next/link";
import { useState } from "react";
import mockOfficeListings from "./mockOfficeListings";

const OfficesPage = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        moreDetails: false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(
            (prev) => ({
                ...prev,
                [section]: !prev[section]
            })
        );
    };

    const [offices, setOffices] =
        useState<OfficeListing[]>(mockOfficeListings);

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const onAddNewOfficeSubmit = async (data: InitiateOfficeListingRequest) => {

        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const newOffice = await OfficeListingController.submitForm(data);
            setSuccessMessage("Office created successfully!");

            // Wrap the new office data with placeholder details
            const newOfficeWithDetails: OfficeListing = {
                officeId: newOffice.officeId,
                officeAddressDetails: {
                    id: Date.now(), // Temporary unique ID
                    businessId: newOffice.officeAddressDetails.businessId,
                    officeId: newOffice.officeId,
                    buildingName: "N/A",
                    floorNumber: "N/A",
                    street: "TBD",
                    city: "TBD",
                    country: "TBD",
                    county: "TBD",
                    postcode: "TBD",
                    latitude: null,
                    longitude: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                officeContactDetails: {
                    id: Date.now(),
                    businessId: newOffice.officeContactDetails.businessId,
                    officeId: newOffice.officeId,
                    primaryContactFirstName: "TBD",
                    primaryContactLastName: "TBD",
                    contactEmail: "TBD",
                    contactNumber: "TBD",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                officeSpecifications: {
                    id: Date.now(),
                    businessId: newOffice.officeSpecifications.businessId,
                    officeId: newOffice.officeId,
                    officeName: "New Office",
                    description: "No description provided.",
                    officeType: "TBD",
                    numberOfFloors: 0,
                    totalDesks: 0,
                    capacity: 0,
                    amenities: [],
                    availability: {
                        days: [],
                        startTime: "00:00",
                        endTime: "00:00",
                    },
                    rules: "TBD",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            };


            console.log(`newOffice: ${newOffice}`)
            setOffices((prevOffices) => [...prevOffices, newOfficeWithDetails]);
        } catch (error) {
            setSubmitError("Failed to create the office. Please try again.");
        }
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const officesPerPage = 3;

    const filteredOffices =
        offices.filter(
            (office) =>
                office.officeAddressDetails.buildingName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                office.officeAddressDetails.city?.toLowerCase().includes(searchQuery.toLowerCase())
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

            {submitError && <p className="text-red-500">{submitError}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

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
                    onClick={() =>
                        onAddNewOfficeSubmit({
                            businessId: "BUS123",
                            officeId: "New Office",
                        })
                    }
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
                            key={office.officeId}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{office.officeSpecifications.officeName}</h2>
                                <p className="text-gray-600 text-sm">
                                    {office.officeSpecifications.description || "No description provided."}
                                </p>
                                <p className="text-sm mt-2">
                                    <strong>Address:</strong> {office.officeAddressDetails.street}  {office.officeAddressDetails.city}  {office.officeAddressDetails.postcode}
                                </p>
                                <p className="text-sm">
                                    <strong>Email:</strong> {office.officeContactDetails.contactEmail}
                                </p>
                                <p className="text-sm">
                                    <strong>Phone:</strong> {office.officeContactDetails.contactNumber}
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
                                                    <strong>Number of Desks:</strong> {office.officeSpecifications.totalDesks}
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
