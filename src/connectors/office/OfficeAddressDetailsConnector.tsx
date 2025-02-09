import { AppConfig } from '@/config/AppConfig';
import { UpdateOfficeAddressDetails } from '@/types/office/CreateOfficeAddressDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface OfficeAddressDetailsConnectorResult {
  success: boolean;
  message: string;
}

class OfficeAddressDetailsConnector {
  async submitForm(data: UpdateOfficeAddressDetails, officeid: string): Promise<OfficeAddressDetailsConnectorResult> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/offices/address/details/update/${officeid}`

    console.log("[OfficeAddressDetailsConnector][submitForm] Attempting to update office address details");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data,
      floorNumber: "3",
      latitude: 999,
      longitude: 999
    };

    console.log("Combined Data:", combinedData);

    try {

      const updateRequest = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

      const response = await fetch(apiUrl, updateRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData = await response.json();

      console.log("Successfully submitted update request:", responseData);
      return {
        success: true,
        message: "Form submitted successfully!",
      };
    } catch (error) {
      console.error("Submission error:", error);
      return {
        success: false,
        message: "Failed to submit the form. Please try again.",
      };
    }
  }
}

export default new OfficeAddressDetailsConnector();
