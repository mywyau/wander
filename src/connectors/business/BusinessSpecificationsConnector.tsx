import { AppConfig } from '@/config/AppConfig';
import { UpdateBusinessSpecifications } from '@/types/business/UpdateBusinessSpecifications';

interface BusinessSpecificationsConnectorResult {
  success: boolean;
  message: string;
}

class BusinessSpecificationsConnector {
  async submitForm(data: UpdateBusinessSpecifications, businessId: string): Promise<BusinessSpecificationsConnectorResult> {

    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/specifications/update/${businessId}`

    console.log("[BusinessSpecificationsConnector] submitForm called");
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

export default new BusinessSpecificationsConnector();
