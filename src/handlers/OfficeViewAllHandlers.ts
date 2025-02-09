import OfficeListingConnector from "@/connectors/office/OfficeListingConnector";
import { OfficeListingCard } from "@/types/office/OfficeListing";
import { InitiateOfficeListingRequest } from "@/types/office/InitiateOfficeListingRequest";
import { Dispatch, SetStateAction } from "react";

export const onAddNewOfficeSubmit = async (
    data: InitiateOfficeListingRequest,
    setOfficeCard: Dispatch<SetStateAction<OfficeListingCard[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    setSubmitError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const newOffice: OfficeListingCard = await OfficeListingConnector.addNewOffice(data);
        setSuccessMessage("Office Created successfully!");

        const newOfficeWithDetails: OfficeListingCard = {
            businessId: data.businessId,
            officeId: data.officeId,
            officeName: "New Office",
            description: "Please add a description",
        };

        setOfficeCard((prevOfficees) => [...prevOfficees, newOfficeWithDetails]);
    } catch (error) {
        setSubmitError("Failed to create the office. Please try again.");
    }
};

export const onDeleteOffice = async (
    officeId: string,
    setOfficeCard: Dispatch<SetStateAction<OfficeListingCard[]>>,
    setSuccessDeleteSingleMessage: Dispatch<SetStateAction<string | null>>,
    setDeleteSingleError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const deleteResult = await OfficeListingConnector.deleteOfficeListing(officeId);

        if (deleteResult) {
            setOfficeCard((prevOfficees) =>
                prevOfficees.filter((office) => office.officeId !== officeId)
            );
            setSuccessDeleteSingleMessage("Office Deleted successfully!");
        } else {
            setDeleteSingleError("Failed to delete the office. Please try again.");
        }
    } catch (error) {
        setDeleteSingleError("Failed to delete the office. Please try again.");
    }
};

export const deleteAllOfficeListings = async (
    businessId:string,
    setOfficeCard: Dispatch<SetStateAction<OfficeListingCard[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    setSubmitError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const deleteResult = await OfficeListingConnector.deleteAllOfficeListings(businessId);

        if (deleteResult) {
            setOfficeCard([]);
            setSuccessMessage("All Office Listings Deleted successfully!");
        } else {
            setSubmitError("Failed to delete all office listings. Please try again.");
        }
    } catch (error) {
        setSubmitError("Failed to delete all office listings. Please try again.");
    }
};
