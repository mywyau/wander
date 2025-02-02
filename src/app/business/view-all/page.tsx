"use client";

import BusinessListCards from "@/components/business/viewAll/BusinessListCards";
import BusinessViewAllErrorSummary from "@/components/business/viewAll/BusinessViewAllErrorSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BusinessListingController from "@/controllers/business/BusinessListingController";
import { BusinessListingCard } from "@/types/business/BusinessListing";
import { InitiateBusinessListingRequest } from "@/types/business/InitiateBusinessListingRequest";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import { IdGenerator } from "@/utils/idGenerator";

const ViewAllBusinessListingsPage = () => {
    const userId = getCookie("userId");
    console.log(`userId: ${userId}`);

    const [loading, setLoading] = useState(true); // Loading state
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
    const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness);
    const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true); // Start loading
                const fetchedBusinesses = await BusinessListingController.getAllBusinessListingCards();
                setBusinesses(fetchedBusinesses);
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
                setLoading(false); // Stop loading in case of error
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

            const newBusinessWithDetails: BusinessListingCard = {
                businessId: data.businessId,
                businessName: "New Business",
                description: "Please add a description",
            };

            console.log(`newBusiness: ${newBusiness}`);
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

    const deleteAllBusinessListings = async () => {
        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const deleteResult = await BusinessListingController.deleteAllBusinessListings(userId);

            if (deleteResult) {
                setBusinesses([]);
                setSuccessMessage("All Business Listings Deleted successfully!");
            } else {
                setSubmitError("Failed to delete all business listings. Please try again.");
            }
        } catch (error) {
            setSubmitError("Failed to delete all business listings. Please try again.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            {/* Display Loading Message if there are no businesses */}
            {loading ? (
                <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">Loading results...</p>
            ) : (
                <>
                    <div className="mb-6 flex justify-between item-center">
                        <Input
                            type="text"
                            placeholder="Search businesses"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="shadowNoBorder"
                            className="w-1/3"
                        />
                        <Button
                            variant="green"
                            className="hover:bg-softGreen"
                            onClick={() => {
                                const randomBusinessId = IdGenerator.generateBusinessId();
                                const newBusinessData: InitiateBusinessListingRequest = { businessId: randomBusinessId };
                                onAddNewBusinessSubmit(newBusinessData);
                            }}
                        >
                            Add a new business
                        </Button>
                    </div>

                    <BusinessViewAllErrorSummary submitError={submitError} successMessage={successMessage} />

                    <BusinessListCards
                        filteredBusinesses={filteredBusinesses}
                        currentBusinesses={currentBusinesses}
                        onDeleteLinkSubmit={onDeleteBusiness}
                    />

                    <div className="mt-8">
                        <Pagination className="mx-auto flex w-full justify-start mt-8">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                                        }}
                                        disabled={currentPage === 1}
                                        activeClassNames="bg-softPurple text-black"
                                        className="bg-hardPurple text-black"
                                    />
                                </PaginationItem>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }).map((_, index) => {
                                    const pageNumber = index + 1;
                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === pageNumber}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(pageNumber);
                                                }}
                                                activeClassNames="bg-softPurple text-black"
                                                className="bg-hardPurple text-black"
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                        }}
                                        activeClassNames="bg-softPurple text-black"
                                        className="bg-hardPurple text-black"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="red"
                                className="mt-5 hover:bg-softRed"
                                onClick={() => {
                                    deleteAllBusinessListings();
                                }}
                            >
                                Delete All
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-softRed">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete all of your businesses, offices, and desks.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-hardRed">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </div>
    );
};

export default ViewAllBusinessListingsPage;
