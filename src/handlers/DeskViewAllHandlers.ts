
import DeskListingConnector from "@/connectors/desk/DeskListingConnector";
import { DeskListingCard } from "@/types/desk/DeskListingCard";
import { InitiateDeskListingRequest } from "@/types/desk/requests/InitiateDeskListingRequest";
import { Dispatch, SetStateAction } from "react";

export const onAddNewDeskSubmit = async (
    data: InitiateDeskListingRequest,
    setDeskCard: Dispatch<SetStateAction<DeskListingCard[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    setSubmitError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const newDesk: DeskListingCard = await DeskListingConnector.addNewDesk(data);
        setSuccessMessage("Desk Created successfully!");

        const newDeskWithDetails: DeskListingCard = {
            deskId: data.deskId,
            deskName: "New Desk",
            description: "Please add a description",
        };

        setDeskCard((prevDeskes) => [...prevDeskes, newDeskWithDetails]);
    } catch (error) {
        setSubmitError("Failed to create the desk. Please try again.");
    }
};

export const onDeleteDesk = async (
    deskId: string,
    setDeskCard: Dispatch<SetStateAction<DeskListingCard[]>>,
    setSuccessDeleteSingleMessage: Dispatch<SetStateAction<string | null>>,
    setDeleteSingleError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const deleteResult = await DeskListingConnector.deleteDeskListing(deskId);

        if (deleteResult) {
            setDeskCard((prevDeskes) =>
                prevDeskes.filter((desk) => desk.deskId !== deskId)
            );
            setSuccessDeleteSingleMessage("Desk Deleted successfully!");
        } else {
            setDeleteSingleError("Failed to delete the desk. Please try again.");
        }
    } catch (error) {
        setDeleteSingleError("Failed to delete the desk. Please try again.");
    }
};

export const deleteAllDeskListings = async (
    officeId:string,
    setDeskCard: Dispatch<SetStateAction<DeskListingCard[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    setSubmitError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const deleteResult = await DeskListingConnector.deleteAllDeskListings(officeId);

        if (deleteResult) {
            setDeskCard([]);
            setSuccessMessage("All Desk Listings Deleted successfully!");
        } else {
            setSubmitError("Failed to delete all desk listings. Please try again.");
        }
    } catch (error) {
        setSubmitError("Failed to delete all desk listings. Please try again.");
    }
};
