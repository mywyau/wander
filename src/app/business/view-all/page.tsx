"use client";

import BusinessCardPagination from "@/components/business/viewAll/BusinessCardPagination";
import BusinessListCards from "@/components/business/viewAll/BusinessListCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BusinessListingConnector from "@/connectors/business/BusinessListingConnector";
import { BusinessListingCard } from "@/types/business/BusinessListing";
import { InitiateBusinessListingRequest } from "@/types/business/InitiateBusinessListingRequest";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";


import DeleteAllAlertDialog from "@/components/business/viewAll/DeleteAllAlertDialog";

import { IdGenerator } from "@/utils/idGenerator";
import { toast } from "sonner";

import {
    deleteAllBusinessListings,
    onAddNewBusinessSubmit,
    onDeleteBusiness
} from "@/handlers/BusinessViewAllHandlers";


const BusinessViewAllPage = () => {

    const userId = getCookie("userId");
    console.log(`userId: ${userId}`);

    const [loading, setLoading] = useState(true);

    const [businessCard, setBusinessCard] = useState<BusinessListingCard[]>([]);

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [deleteSingleError, setDeleteSingleError] = useState<string | null>(null);
    const [successDeleteSingleMessage, setSuccessDeleteSingleMessage] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const businessesPerPage = 9;

    const filteredBusinessCards: BusinessListingCard[] =
        businessCard.filter(
            (card) =>
                card.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    const currentBusinesses = filteredBusinessCards.slice(indexOfFirstBusiness, indexOfLastBusiness);
    const totalPages = Math.ceil(filteredBusinessCards.length / businessesPerPage);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true); // Start loading
                const fetchedBusinesses = await BusinessListingConnector.getAllBusinessListingCards();
                setBusinessCard(fetchedBusinesses);
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchBusinesses();
    }, []);

    // ✅ UseEffect to show toast when state updates
    useEffect(() => {
        if (submitError) {
            toast(submitError, {
                className: "bg-hardRed text-black border-4 border-black shadow-neo p-4",
            });
            setSubmitError(null);

        }
        if (successMessage) {
            toast(successMessage, {
                className: "bg-hardGreen text-black border-4 border-black shadow-neo p-4",
            })
            setSuccessMessage(null);
        }
    }, [submitError, successMessage]); // 👀 Watches state changes

    // ✅ UseEffect to show toast when state updates
    useEffect(() => {
        if (deleteSingleError) {
            toast(successMessage, {
                className: "bg-hardRed text-black border-4 border-black shadow-neo p-4",
            });
            setDeleteSingleError(null);
        }
        if (successDeleteSingleMessage) {
            toast(successDeleteSingleMessage, {
                className: "bg-hardGreen text-black border-4 border-black shadow-neo p-4",
            });
            setSuccessDeleteSingleMessage(null);
        }
    }, [submitError, successDeleteSingleMessage]);


    const [showNoBusinesssMessage, setShowNoBusinesssMessage] = useState(false);

    useEffect(() => {
        if (filteredBusinessCards.length === 0) {
            setShowNoBusinesssMessage(true);
        } else {
            setShowNoBusinesssMessage(false);
        }
    }, [filteredBusinessCards]);

    return (
        <div className="max-w-6xl mx-auto p-8">

            {
                loading ? (
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

                                    onAddNewBusinessSubmit(newBusinessData, setBusinessCard, setSuccessMessage, setSubmitError)
                                }}
                            >
                                Add a new business
                            </Button>
                        </div>

                        {
                            filteredBusinessCards.length === 0 && showNoBusinesssMessage ? (
                                <div className="text-center py-8">
                                    <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">No businesses available or were found</p>
                                </div>
                            ) : (

                                <div className="">

                                    <BusinessListCards
                                        filteredBusinessCards={filteredBusinessCards}
                                        currentBusinessCards={currentBusinesses}
                                        onDeleteSubmit={(businessId) =>
                                            onDeleteBusiness(businessId, setBusinessCard, setSuccessDeleteSingleMessage, setDeleteSingleError)
                                        }
                                    />

                                    <div className="mt-8">

                                        <BusinessCardPagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                        />
                                    </div>

                                    <DeleteAllAlertDialog
                                        deleteAllBusinessListings={() =>
                                            deleteAllBusinessListings(setBusinessCard, setSuccessMessage, setSubmitError)
                                        }
                                    />
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default BusinessViewAllPage;
