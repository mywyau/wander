import AppConfig from '@/config/AppConfig';
import { CreateOfficeContactDetails } from '@/types/office/CreateOfficeContactDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface OfficeContactDetailsControllerResult {
  success: boolean;
  message: string;
}

class OfficeContactDetailsController {

  async submitUpdateForm(data: CreateOfficeContactDetails, officeid: string): Promise<OfficeContactDetailsControllerResult> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/offices/contact/details/update/${officeid}`

    console.log("[OfficeContactDetailsController] submitForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data
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

export default new OfficeContactDetailsController();
