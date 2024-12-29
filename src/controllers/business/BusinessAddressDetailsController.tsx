import AppConfig from '@/config/AppConfig';
import { BusinessAddressDetails } from '@/types/business/BusinessAddressDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface BusinessAddressDetailsControllerResult {
  success: boolean;
  message: string;
}

class BusinessAddressDetailsController {
  async submitForm(data: BusinessAddressDetails): Promise<BusinessAddressDetailsControllerResult> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/address/details/create`

    console.log("[BusinessAddressDetailsController] submitForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data,
      userId: "USER123456",
      businessId: "BUS123456",
      floorNumber: "1",
      latitude: 999,
      longitude: 999,
    };


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

export default new BusinessAddressDetailsController();
