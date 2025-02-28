import { AppConfig } from '@/config/AppConfig';
import { InitiateOfficeListingRequest } from '@/types/office/InitiateOfficeListingRequest';
import { OfficeListing, OfficeListingCard } from '@/types/office/OfficeListing';

class OfficeListingConnector {
  async addNewOffice(data: InitiateOfficeListingRequest): Promise<OfficeListing> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/initiate`;


    const combinedData = {
      ...data,
      officeName: "New Office",
      description: "Please add a description"
    };

    console.log("Combined Data:", combinedData);

    try {
      const createRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

      console.log("[OfficeListingConnector][addNewOffice] trying to add a new office listing, with initial data");
      console.log(apiUrl);

      const response = await fetch(apiUrl, createRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: OfficeListing = await response.json();

      console.log("Successfully submitted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }

  async getAllOfficeListingCards(businessId:string): Promise<OfficeListingCard[]> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/cards/find/all/${businessId}`;

    try {
 
      console.log("[OfficeListingConnector][getAllOfficeListingCards] trying to get all office listing card details");
      console.log(apiUrl);

      const response = await fetch(apiUrl, { method: "GET", cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to get card data");
      }

      const responseData: OfficeListingCard[] = await response.json();

      console.log("Successfully retrieved card details:", responseData);
      return responseData;
    } catch (error) {
      console.error("Retrieval error:", error);
      throw new Error("Failed to retrieve card details. Please try again.");
    }
  }

  async getOfficeListing(officeId:string): Promise<OfficeListing> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/find/${officeId}`;

    try {
      console.log("[OfficeListingConnector][getOfficeListing] trying to find office listing details for a given id");
      console.log(apiUrl);

      const response = await fetch(apiUrl, { method: "GET", cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to get card data");
      }

      const responseData: OfficeListing = await response.json();

      console.log("Successfully retrieved office listing details:", responseData);
      return responseData;
    } catch (error) {
      console.error("Retrieval error:", error);
      throw new Error("Failed to retrieve office listing details. Please try again.");
    }
  }


  async deleteOfficeListing(officeId: string): Promise<OfficeListing> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/delete/${officeId}`;

    try {
      const deleteRequest = {
        method: "DELETE",
      };

      console.log("[OfficeListingConnector][deleteOfficeListing] trying to delete office listing");
      console.log(apiUrl);

      const response = await fetch(apiUrl, deleteRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: OfficeListing = await response.json();

      console.log("Successfully deleted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }

  async deleteAllOfficeListings(businessId: string): Promise<OfficeListing> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/delete/all/${businessId}`;

    try {
      const deleteRequest = {
        method: "DELETE",
      };

      console.log("[OfficeListingConnector][deleteOfficeListing] trying to delete ALL office listings");
      console.log(apiUrl);

      const response = await fetch(apiUrl, deleteRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: OfficeListing = await response.json();

      console.log("Successfully deleted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }



}

export default new OfficeListingConnector();
