import { InitiateBusinessListingRequest } from '@/types/business/InitiateBusinessListingRequest';
import { BusinessListing, BusinessListingCard } from '@/types/business/BusinessListing';
import { AppConfig } from '@/config/AppConfig';

class BusinessListingConnector {
  async addNewBusiness(data: InitiateBusinessListingRequest): Promise<BusinessListingCard> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/listing/initiate`;

    const combinedData = {
      ...data,
      userId: "USER-1337",
      businessName: "New Business",
      description: "Please add a description"
    };

    console.log("Combined Data:", combinedData);

    try {
      const createRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

      console.log("[BusinessListingController][addNewBusiness] trying to add a new business listing, with initial data");
      console.log(apiUrl);

      const response = await fetch(apiUrl, createRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: BusinessListingCard = await response.json();

      console.log("Successfully submitted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }

  async getAllBusinessListingCards(): Promise<BusinessListingCard[]> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    // const apiUrl = `http://pistachio.localhost/pistachio/business/businesses/listing/cards/find/all`;
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/listing/cards/find/all`;

    try {
      const getRequest = {
        method: "GET",
      };

      console.log("[BusinessListingController][getAllBusinessListingCards] trying to get all business listing card details");
      console.log(apiUrl);

      const response = await fetch(apiUrl, getRequest);

      if (!response.ok) {
        throw new Error("Failed to get card data");
      }

      const responseData: BusinessListingCard[] = await response.json();

      console.log("Successfully retrieved card details:", responseData);
      return responseData;
    } catch (error) {
      console.error("Retrieval error:", error);
      throw new Error("Failed to retrieve card details. Please try again.");
    }
  }

  async getBusinessListing(businessId:string): Promise<BusinessListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/listing/find/${businessId}`;

    try {
  

      console.log("[BusinessListingController][getBusinessListing] trying to find business listing details for a given id");
      console.log(apiUrl);

      const response = await fetch(apiUrl, { method: "GET", cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to get card data");
      }

      const responseData: BusinessListing = await response.json();

      console.log("Successfully retrieved business listing details:", responseData);
      return responseData;
    } catch (error) {
      console.error("Retrieval error:", error);
      throw new Error("Failed to retrieve business listing details. Please try again.");
    }
  }


  async deleteBusinessListing(businessId: string): Promise<BusinessListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/listing/delete/${businessId}`;

    try {
      const deleteRequest = {
        method: "DELETE",
      };

      console.log("[BusinessListingController][deleteBusinessListing] trying to delete business listing");
      console.log(apiUrl);

      const response = await fetch(apiUrl, deleteRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: BusinessListing = await response.json();

      console.log("Successfully deleted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }

  
  async deleteAllBusinessListings(userId: string): Promise<BusinessListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/listing/delete/all/${userId}`;

    try {
      const deleteRequest = {
        method: "DELETE",
      };

      console.log("[BusinessListingController][deleteAllBusinessListings] trying to delete ALL business listings");
      console.log(apiUrl);

      const response = await fetch(apiUrl, deleteRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: BusinessListing = await response.json();

      console.log("Successfully deleted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }



}

export default new BusinessListingConnector();
