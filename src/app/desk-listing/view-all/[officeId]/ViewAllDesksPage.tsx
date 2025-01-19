"use client";

import AddNewDeskButton from "@/components/desks/viewAll/AddNewDeskButton";
import DeleteAllDeskListingsButton from "@/components/desks/viewAll/DeleteAllDesksButton";
import DeskListCards from "@/components/desks/viewAll/DeskListCards";
import DeskViewAllErrorSummary from "@/components/desks/viewAll/DeskViewAllErrorSummary";
import DeskViewAllPagination from "@/components/desks/viewAll/DeskViewAllPagination";
import SearchAndFilterDesks from "@/components/desks/viewAll/SearchAndFilterDesks";
import DeskListingController from "@/controllers/desk/DeskListingController";
import { DeskListing } from "@/types/desk/DeskListing";
import { DeskListingCard } from "@/types/desk/DeskListingCard";
import { InitiateDeskListingRequest } from "@/types/desk/requests/InitiateDeskListingRequest";
import { useState } from "react";


export default function ViewAllDesksPage({ officeId, initialDesks }: { officeId: string; initialDesks: DeskListingCard[] }) {

    const [desks, setDesks] = useState<DeskListingCard[]>(initialDesks);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const desksPerPage = 9;

    const filteredDesks = desks.filter(
        (desk) =>
            desk.deskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            desk.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDesk = currentPage * desksPerPage;
    const indexOfFirstDesk = indexOfLastDesk - desksPerPage;
    const currentDesks = filteredDesks.slice(indexOfFirstDesk, indexOfLastDesk);
    const totalPages = Math.ceil(filteredDesks.length / desksPerPage);

    const onAddNewDeskSubmit = async (data: InitiateDeskListingRequest) => {
        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const newDesk: DeskListing = await DeskListingController.addNewDesk(data);
            setSuccessMessage("Desk created successfully!");

            const newDeskWithDetails: DeskListingCard = {
                officeId: data.officeId,
                deskId: data.deskId,
                deskName: "New Desk",
                description: "Please add a description",
            };

            setDesks((prevDesks) => [...prevDesks, newDeskWithDetails]);
        } catch (error) {
            setSubmitError("Failed to create the desk. Please try again.");
        }
    };

    const onDeleteDesk = async (deskId: string) => {

        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const deleteResult = await DeskListingController.deleteDeskListing(deskId);

            if (deleteResult) {
                setDesks((prevDesks) => prevDesks.filter((desk) => desk.deskId !== deskId));
                setSuccessMessage("Desk Deleted successfully!");
            } else {
                setSubmitError("Failed to delete the desk. Please try again.");
            }
        } catch (error) {
            setSubmitError("Failed to delete the desk. Please try again.");
        }
    };

    const onDeleteAllDesksSubmit = async (officeId: string) => {

        setSubmitError(null);
        setSuccessMessage(null);

        try {
            const deleteResult = await DeskListingController.deleteAllDeskListings(officeId);

            if (deleteResult) {
                setDesks((prevDesks) => []);
                setSuccessMessage("All Desks Deleted successfully!");
            } else {
                setSubmitError("Failed to delete the desk. Please try again.");
            }
        } catch (error) {
            setSubmitError("Failed to delete the desk. Please try again.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Your Desks</h1>

            <div className="mb-6 flex justify-between item-center">
                <SearchAndFilterDesks searchQuery={searchQuery} setSearchQueryF={setSearchQuery} />
                <AddNewDeskButton officeId={officeId} onSubmit={onAddNewDeskSubmit} />
            </div>

            <DeskViewAllErrorSummary submitError={submitError} successMessage={successMessage} />

            <div className="mb-6">

                <DeskListCards
                    filteredDesks={filteredDesks}
                    currentDesks={currentDesks}
                    onDeleteLinkSubmit={onDeleteDesk}
                />

                <DeskViewAllPagination
                    filteredDesks={filteredDesks}
                    desksPerPage={desksPerPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <div className="mt-4 mb-6">

                <DeleteAllDeskListingsButton officeId={officeId} onSubmit={onDeleteAllDesksSubmit} />
            </div>
        </div>
    );
}
