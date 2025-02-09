import { AppConfig } from '@/config/AppConfig';
import { UpdateBusinessAddressDetails } from '@/types/business/UpdateBusinessAddressDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface BusinessAddressDetailsConnectorResult {
  success: boolean;
  message: string;
}

class BusinessAddressDetailsConnector {
  async submitForm(data: UpdateBusinessAddressDetails, businessId: string): Promise<BusinessAddressDetailsConnectorResult> {

    const pistachioUrl = AppConfig.basePistachioUrl()
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/address/details/update/${businessId}`

    console.log("[BusinessAddressDetailsConnector] submitForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data,
      floorNumber: "1",
      latitude: 999,
      longitude: 999,
    };


    console.log("Combined Data:", combinedData);

    try {

      const createRequest = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

      const response = await fetch(apiUrl, createRequest);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData = await response.json();

      console.log("Successfully submitted:", responseData);
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

export default new BusinessAddressDetailsConnector();
