"use client";

import AddNewBusinessButton from "@/components/business/viewAll/AddNewBusinessButton";
import BusinessListCards from "@/components/business/viewAll/BusinessListCards";
import BusinessViewAllErrorSummary from "@/components/business/viewAll/BusinessViewAllErrorSummary";
import BusinessViewAllPagination from "@/components/business/viewAll/Pagination";
import SearchAndFilterBusinesses from "@/components/business/viewAll/SearchAndFilterBusinesses";
import BusinessListingController from "@/controllers/business/BusinessListingController";
import { BusinessListingCard } from "@/types/business/BusinessListing";
import { InitiateBusinessListingRequest } from "@/types/business/InitiateBusinessListingRequest";
import { useEffect, useState } from "react";

const BusinessesPage = () => {

    const [businesses, setBusinesses] = useState<BusinessListingCard[]>([]);

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const businessesPerPage = 9;

    const filteredBusinesses: BusinessListingCard[] =
        businesses.filter(
            (business) =>
                business.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                business.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const indexOfLastBusiness = currentPage * businessesPerPage;

    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;

    const currentBusinesses =
        filteredBusinesses
            .slice(
                indexOfFirstBusiness,
                indexOfLastBusiness
            );

    const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {

                const fetchedBusinesses = await BusinessListingController.getAllBusinessListingCards();

                setBusinesses(fetchedBusinesses);
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
            }
        };

        fetchBusinesses();
    }, []);

    const onAddNewBusinessSubmit = async (data: InitiateBusinessListingRequest) => {

        setSubmitError(null);
        setSuccessMessage(null);

        try {

            const newBusiness: BusinessListingCard = await BusinessListingController.addNewBusiness(data);
            setSuccessMessage("Business created successfully!");

            const newBusinessWithDetails: BusinessListingCard =
            {
                businessId: data.businessId,
                businessName: "New Business",
                description: "Please add a description",
            };

            console.log(`newBusiness: ${newBusiness}`)
            setBusinesses((prevBusinesses) => [...prevBusinesses, newBusinessWithDetails]);
        } catch (error) {
            setSubmitError("Failed to create the business. Please try again.");
        }
    };

    const onDeleteBusiness = async (businessId: string) => {
        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const deleteResult = await BusinessListingController.deleteBusinessListing(businessId);

            if (deleteResult) {
                setBusinesses((prevBusinesses) =>
                    prevBusinesses.filter((business) => business.businessId !== businessId)
                );
                setSuccessMessage("Business Deleted successfully!");
            } else {
                setSubmitError("Failed to delete the business. Please try again.");
            }
        } catch (error) {
            setSubmitError("Failed to delete the business. Please try again.");
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-2xl font-bold mb-6">Your Businesses</h1>

            <div className="mb-6 flex justify-between item-center">

                <SearchAndFilterBusinesses searchQuery={searchQuery} setSearchQueryF={setSearchQuery} />

                <AddNewBusinessButton onSubmit={onAddNewBusinessSubmit} />
            </div>

            <BusinessViewAllErrorSummary
                submitError={submitError}
                successMessage={successMessage}
            />

            <BusinessListCards
                filteredBusinesses={filteredBusinesses}
                currentBusinesses={currentBusinesses}
                onDeleteLinkSubmit={onDeleteBusiness}
            />

            <BusinessViewAllPagination
                filteredBusinesses={filteredBusinesses}
                businessesPerPage={businessesPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
        </div>
    );
};

export default BusinessesPage;
