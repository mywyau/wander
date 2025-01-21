import AppConfig from '@/config/AppConfig';
import { DeskListing } from '@/types/desk/DeskListing';
import { DeskListingCard } from '@/types/desk/DeskListingCard';
import { InitiateDeskListingRequest } from '@/types/desk/requests/InitiateDeskListingRequest';

class DeskListingController {
  async addNewDesk(data: InitiateDeskListingRequest): Promise<DeskListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/desk/listing/initiate`;

    const combinedData = {
      ...data,
      deskName: "New Desk",
      description: "Please add some details"
    };

    console.log("Combined Data:", combinedData);

    try {
      const createRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

      console.log("[DeskListingController][addNewDesk] trying to add a new desk listing, with initial data");
      console.log(apiUrl);

      const response = await fetch(apiUrl, createRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: DeskListing = await response.json();

      console.log("Successfully submitted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }

  async getAllDeskListingCards(officeId:string): Promise<DeskListingCard[]> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/desk/listing/cards/find/all/${officeId}`;

    try {
 
      console.log("[DeskListingController][getAllDeskListingCards] trying to get all desk listing card details");
      console.log(apiUrl);

      const response = await fetch(apiUrl, { method: "GET", cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to get card data");
      }

      const responseData: DeskListingCard[] = await response.json();

      console.log("Successfully retrieved card details:", responseData);
      return responseData;
    } catch (error) {
      console.error("Retrieval error:", error);
      return []
      // throw new Error("Failed to retrieve card details. Please try again.");
    }
  }

  async getDeskListing(deskId:string): Promise<DeskListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/desk/listing/details/find/${deskId}`;

    try {
      console.log("[DeskListingController][getDeskListing] trying to find desk listing details for a given id");
      console.log(apiUrl);

      const response = await fetch(apiUrl, { method: "GET", cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to get card data");
      }

      const responseData: DeskListing = await response.json();

      console.log("Successfully retrieved desk listing details:", responseData);
      return responseData;
    } catch (error) {
      console.error("Retrieval error:", error);
      throw new Error("Failed to retrieve desk listing details. Please try again.");
    }
  }


  async deleteDeskListing(deskId: string): Promise<DeskListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/desk/listing/details/delete/${deskId}`;

    try {
      const deleteRequest = {
        method: "DELETE",
      };

      console.log("[DeskListingController][deleteDeskListing] trying to delete desk listing");
      console.log(apiUrl);

      const response = await fetch(apiUrl, deleteRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: DeskListing = await response.json();

      console.log("Successfully deleted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }

  async deleteAllDeskListings(officeId: string): Promise<DeskListing> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/desk/listing/delete/all/${officeId}`;

    try {
      const deleteRequest = {
        method: "DELETE",
      };

      console.log("[DeskListingController][deleteDeskListing] trying to delete ALL desk listings");
      console.log(apiUrl);

      const response = await fetch(apiUrl, deleteRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: DeskListing = await response.json();

      console.log("Successfully deleted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }



}

export default new DeskListingController();
