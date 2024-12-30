"use client";

import AddNewOfficeButton from "@/components/office/viewAll/AddNewOfficeButton";
import OfficeListCards from "@/components/office/viewAll/OfficeListCards";
import OfficeViewAllErrorSummary from "@/components/office/viewAll/OfficeViewAllErrorSummary";
import OfficeViewAllPagination from "@/components/office/viewAll/Pagination";
import SearchAndFilterOffices from "@/components/office/viewAll/SearchAndFilterOffices";
import OfficeListingController from "@/controllers/office/OfficeListingController";
import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { OfficeListing } from "@/types/office/OfficeListing";
import transformOfficeListing from '@/utils/officeViewAll/transformOfficeListing';
import { useEffect, useState } from "react";

const OfficesPage = () => {

    const [offices, setOffices] = useState<OfficeListing[]>([]);

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const officesPerPage = 9;

    const filteredOffices =
        offices.filter(
            (office) =>
                office.officeSpecifications.officeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                office.officeSpecifications.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                office.officeSpecifications.officeType?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const indexOfLastOffice = currentPage * officesPerPage;

    const indexOfFirstOffice = indexOfLastOffice - officesPerPage;

    const currentOffices =
        filteredOffices
            .slice(
                indexOfFirstOffice,
                indexOfLastOffice
            );

    const totalPages = Math.ceil(filteredOffices.length / officesPerPage);

    useEffect(() => {
        const fetchOffices = async () => {
            try {

                const fetchedOffices = await OfficeListingController.getAllOffices();
                const transformedOffices: OfficeListing[] = fetchedOffices.map(transformOfficeListing);

                setOffices(transformedOffices);
            } catch (error) {
                console.error("Failed to fetch offices:", error);
            }
        };

        fetchOffices();
    }, []);

    const onAddNewOfficeSubmit = async (data: InitiateOfficeListingRequest) => {

        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const newOffice = await OfficeListingController.addNewOffice(data);
            setSuccessMessage("Office created successfully!");

            const newOfficeWithDetails: OfficeListing = {
                officeId: newOffice.officeId,
                officeAddressDetails: {
                    id: Date.now(),
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
    
    const onDeleteOffice = async (officeId: string) => {
        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const deleteResult = await OfficeListingController.deleteOfficeListing(officeId);

            if (deleteResult) {
                setOffices((prevOffices) =>
                    prevOffices.filter((office) => office.officeId !== officeId) // Remove the office with matching officeId
                );
                setSuccessMessage("Office DELETED successfully!");
            } else {
                setSubmitError("Failed to DELETE the office. Please try again.");
            }
        } catch (error) {
            setSubmitError("Failed to DELETE the office. Please try again.");
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-2xl font-bold mb-6">Your Offices</h1>

            <OfficeViewAllErrorSummary
                submitError={submitError}
                successMessage={successMessage}
            />

            <div className="mb-6 flex justify-between item-center">

                <SearchAndFilterOffices searchQuery={searchQuery} setSearchQueryF={setSearchQuery} />

                <AddNewOfficeButton onSubmit={onAddNewOfficeSubmit} />
            </div>

            <OfficeListCards
                filteredOffices={filteredOffices}
                currentOffices={currentOffices}
                onDeleteLinkSubmit={onDeleteOffice}
            />

            <OfficeViewAllPagination
                filteredOffices={filteredOffices}
                officesPerPage={officesPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
        </div>
    );
};

export default OfficesPage;
