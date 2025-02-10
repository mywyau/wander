import { AppConfig } from '@/config/AppConfig';
import { UpdateDeskSpecifications } from '@/types/desk/UpdateDeskSpecifications';

interface DeskSpecificationsConnectorResult {
  success: boolean;
  message: string;
}

class DeskSpecificationsConnector {
  async submitForm(data: UpdateDeskSpecifications, deskId: String): Promise<DeskSpecificationsConnectorResult> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/desk/specifications/details/update/${deskId}`

    console.log("[DeskSpecificationsConnector] submitForm called");
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

export default new DeskSpecificationsConnector();
