"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeskListingConnector from "@/connectors/desk/DeskListingConnector";
import { InitiateDeskListingRequest } from "@/types/desk/InitiateDeskListingRequest";
import { DeskListingCard } from "@/types/desk/DeskListing";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { IdGenerator } from "@/utils/idGenerator";
import { toast } from "sonner";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import DeleteAllAlertDialog from "@/components/desk/viewAll/DeleteAllAlertDialog";
import DeskCardPagination from "@/components/desk/viewAll/DeskCardPagination";
import DeskListCards from "@/components/desk/viewAll/DeskListCards";
import {
    deleteAllDeskListings,
    onAddNewDeskSubmit,
    onDeleteDesk
} from "@/handlers/DeskViewAllHandlers";


interface AddDeskPageProps {
    params: {
        businessId: string
    };
}

export default function DeskViewAllPage({ params }: AddDeskPageProps) {

    const { businessId } = params; // ✅ Correct way to get path params

    const userId = getCookie("userId");
    console.log(`userId: ${userId}`);

    const [loading, setLoading] = useState(true);
    const [deskCard, setDeskCard] = useState<DeskListingCard[]>([]);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [deleteSingleError, setDeleteSingleError] = useState<string | null>(null);
    const [successDeleteSingleMessage, setSuccessDeleteSingleMessage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const desksPerPage = 9;

    // ✅ Filter desks based on search
    const filteredDeskCards = deskCard.filter(
        (card) =>
            card.deskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDesk = currentPage * desksPerPage;
    const indexOfFirstDesk = indexOfLastDesk - desksPerPage;
    const currentDesks = filteredDeskCards.slice(indexOfFirstDesk, indexOfLastDesk);
    const totalPages = Math.ceil(filteredDeskCards.length / desksPerPage);

    const [showNoDesksMessage, setShowNoDesksMessage] = useState(false);

    useEffect(() => {
        const fetchDesks = async () => {
            try {
                setLoading(true);
                const fetchedDesks = await DeskListingConnector.getAllDeskListingCards(businessId);
                setDeskCard(fetchedDesks);
            } catch (error) {
                console.error("Failed to fetch desks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDesks();
    }, [businessId]);

    // ✅ Show toast notifications
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
            });
            setSuccessMessage(null);
        }
    }, [submitError, successMessage]);

    // ✅ Handle delete success/error messages
    useEffect(() => {
        if (deleteSingleError) {
            toast(deleteSingleError, {
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
    }, [deleteSingleError, successDeleteSingleMessage]);

    useEffect(() => {
        setShowNoDesksMessage(filteredDeskCards.length === 0);
    }, [filteredDeskCards]);

    return (
        <div className="max-w-6xl mx-auto p-8">
            {loading ? (
                <p className="text-center text-gray-600 col-span-full text-2xl font-semibold">Loading results...</p>
            ) : (
                <>
                    {/* Breadcrumbs with spacing below */}
                    <div className="w-full rounded-lg  mb-6">
                        <Breadcrumb>
                            <BreadcrumbList>

                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/wander/business/view-all" className="hover:text-blue-800">
                                        View all businesses
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={`/wander/desk/view-all/${businessId}?timestamp=${Date.now()}`}
                                        className="hover:text-blue-800"
                                    >
                                        View all desks for business 
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>


                    <div className="mb-6 flex justify-between items-center">
                        <Input
                            type="text"
                            placeholder="Search desks"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            variant="shadowNoBorder"
                            className="w-1/3"
                        />
                        <Button
                            variant="green"
                            className="hover:bg-softGreen"
                            onClick={() => {
                                const randomDeskId = IdGenerator.generateDeskId();
                                const newDeskData: InitiateDeskListingRequest = { businessId, deskId: randomDeskId };
                                onAddNewDeskSubmit(newDeskData, setDeskCard, setSuccessMessage, setSubmitError);
                            }}
                        >
                            Add a new desk
                        </Button>
                    </div>

                    {showNoDesksMessage ? (
                        <p className="text-center text-gray-600 text-2xl font-semibold">No desks available.</p>
                    ) : (
                        <>
                            <DeskListCards
                                filteredDeskCards={filteredDeskCards}
                                currentDeskCards={currentDesks}
                                onDeleteSubmit={(businessId) =>
                                    onDeleteDesk(businessId, setDeskCard, setSuccessDeleteSingleMessage, setDeleteSingleError)
                                }
                            />
                            <DeskCardPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                            <DeleteAllAlertDialog deleteAllDeskListings={() => deleteAllDeskListings(businessId, setDeskCard, setSuccessMessage, setSubmitError)} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
