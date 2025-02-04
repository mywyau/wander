import BusinessListingConnector from "@/connectors/BusinessListingConnector";
import { BusinessListingCard } from "@/types/business/BusinessListing";
import { InitiateBusinessListingRequest } from "@/types/business/InitiateBusinessListingRequest";
import { Dispatch, SetStateAction } from "react";

export const onAddNewBusinessSubmit = async (
    data: InitiateBusinessListingRequest,
    setBusinessCard: Dispatch<SetStateAction<BusinessListingCard[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    setSubmitError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const newBusiness: BusinessListingCard = await BusinessListingConnector.addNewBusiness(data);
        setSuccessMessage("Business Created successfully!");

        const newBusinessWithDetails: BusinessListingCard = {
            businessId: data.businessId,
            businessName: "New Business",
            description: "Please add a description",
        };

        setBusinessCard((prevBusinesses) => [...prevBusinesses, newBusinessWithDetails]);
    } catch (error) {
        setSubmitError("Failed to create the business. Please try again.");
    }
};

export const onDeleteBusiness = async (
    businessId: string,
    setBusinessCard: Dispatch<SetStateAction<BusinessListingCard[]>>,
    setSuccessDeleteSingleMessage: Dispatch<SetStateAction<string | null>>,
    setDeleteSingleError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const deleteResult = await BusinessListingConnector.deleteBusinessListing(businessId);

        if (deleteResult) {
            setBusinessCard((prevBusinesses) =>
                prevBusinesses.filter((business) => business.businessId !== businessId)
            );
            setSuccessDeleteSingleMessage("Business Deleted successfully!");
        } else {
            setDeleteSingleError("Failed to delete the business. Please try again.");
        }
    } catch (error) {
        setDeleteSingleError("Failed to delete the business. Please try again.");
    }
};

export const deleteAllBusinessListings = async (
    setBusinessCard: Dispatch<SetStateAction<BusinessListingCard[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string | null>>,
    setSubmitError: Dispatch<SetStateAction<string | null>>
) => {
    try {
        const deleteResult = await BusinessListingConnector.deleteAllBusinessListings("USER-1337");

        if (deleteResult) {
            setBusinessCard([]);
            setSuccessMessage("All Business Listings Deleted successfully!");
        } else {
            setSubmitError("Failed to delete all business listings. Please try again.");
        }
    } catch (error) {
        setSubmitError("Failed to delete all business listings. Please try again.");
    }
};
