"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OfficeListingConnector from "@/connectors/office/OfficeListingConnector";
import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { OfficeListingCard } from "@/types/office/OfficeListing";
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

import DeleteAllAlertDialog from "@/components/office/viewAll/DeleteAllAlertDialog";
import OfficeCardPagination from "@/components/office/viewAll/OfficeCardPagination";
import OfficeListCards from "@/components/office/viewAll/OfficeListCards";
import {
    deleteAllOfficeListings,
    onAddNewOfficeSubmit,
    onDeleteOffice
} from "@/handlers/OfficeViewAllHandlers";


interface AddOfficePageProps {
    params: {
        businessId: string
    };
}

export default function OfficeViewAllPage({ params }: AddOfficePageProps) {

    const { businessId } = params; // ✅ Correct way to get path params

    const userId = getCookie("userId");
    console.log(`userId: ${userId}`);

    const [loading, setLoading] = useState(true);
    const [officeCard, setOfficeCard] = useState<OfficeListingCard[]>([]);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [deleteSingleError, setDeleteSingleError] = useState<string | null>(null);
    const [successDeleteSingleMessage, setSuccessDeleteSingleMessage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const officesPerPage = 9;

    // ✅ Filter offices based on search
    const filteredOfficeCards = officeCard.filter(
        (card) =>
            card.officeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastOffice = currentPage * officesPerPage;
    const indexOfFirstOffice = indexOfLastOffice - officesPerPage;
    const currentOffices = filteredOfficeCards.slice(indexOfFirstOffice, indexOfLastOffice);
    const totalPages = Math.ceil(filteredOfficeCards.length / officesPerPage);

    const [showNoOfficesMessage, setShowNoOfficesMessage] = useState(false);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                setLoading(true);
                const fetchedOffices = await OfficeListingConnector.getAllOfficeListingCards(businessId);
                setOfficeCard(fetchedOffices);
            } catch (error) {
                console.error("Failed to fetch offices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
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
        setShowNoOfficesMessage(filteredOfficeCards.length === 0);
    }, [filteredOfficeCards]);

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
                                        href={`/wander/office/view-all/${businessId}?timestamp=${Date.now()}`}
                                        className="hover:text-blue-800"
                                    >
                                        View all offices for business 
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>


                    <div className="mb-6 flex justify-between items-center">
                        <Input
                            type="text"
                            placeholder="Search offices"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            variant="shadowNoBorder"
                            className="w-1/3"
                        />
                        <Button
                            variant="green"
                            className="hover:bg-softGreen"
                            onClick={() => {
                                const randomOfficeId = IdGenerator.generateOfficeId();
                                const newOfficeData: InitiateOfficeListingRequest = { businessId, officeId: randomOfficeId };
                                onAddNewOfficeSubmit(newOfficeData, setOfficeCard, setSuccessMessage, setSubmitError);
                            }}
                        >
                            Add a new office
                        </Button>
                    </div>

                    {showNoOfficesMessage ? (
                        <p className="text-center text-gray-600 text-2xl font-semibold">No offices available.</p>
                    ) : (
                        <>
                            <OfficeListCards
                                filteredOfficeCards={filteredOfficeCards}
                                currentOfficeCards={currentOffices}
                                onDeleteSubmit={(businessId) =>
                                    onDeleteOffice(businessId, setOfficeCard, setSuccessDeleteSingleMessage, setDeleteSingleError)
                                }
                            />
                            <OfficeCardPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                            <DeleteAllAlertDialog deleteAllOfficeListings={() => deleteAllOfficeListings(businessId, setOfficeCard, setSuccessMessage, setSubmitError)} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
