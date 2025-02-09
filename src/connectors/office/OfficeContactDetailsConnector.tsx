import { AppConfig } from '@/config/AppConfig';
import { UpdateOfficeContactDetails } from '@/types/office/UpdateOfficeContactDetails'; // Ensure to import the types

// Interface for the result returned by the submitForm method
interface OfficeContactDetailsConnectorResult {
  success: boolean;
  message: string;
}

class OfficeContactDetailsConnector {

  async submitUpdateForm(data: UpdateOfficeContactDetails, officeid: string): Promise<OfficeContactDetailsConnectorResult> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/offices/contact/details/update/${officeid}`

    console.log("[OfficeContactDetailsConnector] submitForm called");
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

export default new OfficeContactDetailsConnector();
