import AppConfig from '@/config/AppConfig';
import { OfficeSpecifications } from '@/types/office/OfficeSpecifications';

interface OfficeSpecificationsControllerResult {
  success: boolean;
  message: string;
}

class OfficeSpecificationsController {
  async submitForm(data: OfficeSpecifications): Promise<OfficeSpecificationsControllerResult> {

    const pistachioUrl = AppConfig.basePistachioUrl(false);
    const apiUrl = `http://${pistachioUrl}/pistachio/business/offices/specifications/create`

    console.log("[OfficeSpecificationsController] submitForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      ...data,
      businessId: "BUS1337",
      officeId: "OFF1337"
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

export default new OfficeSpecificationsController();
