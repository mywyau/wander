import AppConfig from '@/config/AppConfig';
import { CreateOfficeAddressDetails } from '@/types/office/CreateOfficeAddressDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface OfficeAddressDetailsControllerResult {
  success: boolean;
  message: string;
}

class OfficeAddressDetailsController {
  async submitForm(data: CreateOfficeAddressDetails): Promise<OfficeAddressDetailsControllerResult> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/offices/address/create`

    console.log("[OfficeAddressDetailsController] submitForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data,
      businessId: "BUS123456",
      officeId: "OFF123456",
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

export default new OfficeAddressDetailsController();
