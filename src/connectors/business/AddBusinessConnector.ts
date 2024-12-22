import AppConfig from "@/config/AppConfig";
import { BusinessListing } from "../types/BusinessListing";


export const createBusiness = async (businessData: Partial<BusinessListing>) => {

    const response = await fetch(
        `http://${AppConfig.basePistachioUrl(true)}//pistachio/businesses/business/create`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(businessData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create business.");
    }

    return await response.json();
};