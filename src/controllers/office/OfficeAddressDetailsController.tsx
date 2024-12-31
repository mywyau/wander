import AppConfig from '@/config/AppConfig';
import { CreateOfficeAddressDetails, UpdateOfficeAddressDetails } from '@/types/office/CreateOfficeAddressDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface OfficeAddressDetailsControllerResult {
  success: boolean;
  message: string;
}

class OfficeAddressDetailsController {
  async submitForm(data: UpdateOfficeAddressDetails, officeid:string): Promise<OfficeAddressDetailsControllerResult> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/offices/address/${officeid}`

    console.log("[OfficeAddressDetailsController][submitForm] Attempting to update office address details");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data,
      floorNumber: "3",
      latitude: 999,
      longitude: 999,
      updatedAt: new Date().toISOString().slice(0, 19)
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

export default new OfficeAddressDetailsController();
