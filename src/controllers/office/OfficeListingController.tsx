import AppConfig from '@/config/AppConfig';
import { InitiateOfficeListingRequest } from '@/types/office/InitiateOfficeListingRequest';
import { OfficeListing } from '@/types/office/OfficeListing';

class OfficeListingController {
  async submitForm(data: InitiateOfficeListingRequest): Promise<OfficeListing> {
    
    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/initiate`;

    console.log("[OfficeListingController] submitForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = { ...data };

    console.log("Combined Data:", combinedData);

    try {
      const createRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

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


  async getAllOffices(): Promise<OfficeListing[]> {
    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/office/listing/find/all`;

    console.log("[OfficeListingController] submitForm called");
    console.log(apiUrl);

    try {
      const createRequest = {
        method: "GET",
      };

      const response = await fetch(apiUrl, createRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData: OfficeListing[] = await response.json();

      console.log("Successfully submitted:", responseData);
      return responseData;
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("Failed to submit the form. Please try again.");
    }
  }
}

export default new OfficeListingController();
