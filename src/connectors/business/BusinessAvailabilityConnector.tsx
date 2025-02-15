import { AppConfig } from '@/config/AppConfig';
import { OpeningHours } from '@/types/OpeningHours';
import { toStringFormat } from '@/types/LocalTime';

interface BusinessAvailabilityConnectorResult {
  success: boolean;
  message: string;
  statusCode: number;  // Add status code field
}

class BusinessAvailabilityConnector {
  // Submit days form
  async submitDayForm(data: string[], businessId: string): Promise<BusinessAvailabilityConnectorResult> {
    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/availability/days/update/${businessId}`;

    console.log("[BusinessAvailabilityConnector] submitDayForm called");
    console.log("Form Data:", data);
    console.log(apiUrl);

    const combinedData = {
      days: data,
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
        throw new Error(`Failed to submit form, Status Code: ${response.status}`);
      }

      const responseData = await response.json();

      console.log("Successfully submitted:", responseData);
      return {
        success: true,
        message: "Form submitted successfully!",
        statusCode: response.status,  // Return the status code
      };
    } catch (error) {
      console.error("Submission error:", error);
      return {
        success: false,
        message: "Failed to submit the form. Please try again.",
        statusCode: 500,  // General failure code
      };
    }
  }

  // Submit time form
  async submitTimeForm(openingHours: OpeningHours, businessId: string): Promise<BusinessAvailabilityConnectorResult> {
    const pistachioUrl = AppConfig.basePistachioUrl();
    const apiUrl = `http://${pistachioUrl}/pistachio/business/businesses/availability/hours/update/${businessId}`;

    console.log("[BusinessAvailabilityConnector] submitTimeForm called");
    console.log("Form Data:", openingHours);
    console.log(apiUrl);

    // Correctly use the toStringFormat method to format times
    const combinedData = {
      openingTime: toStringFormat(openingHours.openingTime),
      closingTime: toStringFormat(openingHours.closingTime),
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
        throw new Error(`Failed to submit form, Status Code: ${response.status}`);
      }

      const responseData = await response.json();

      console.log("Successfully submitted:", responseData);
      return {
        success: true,
        message: "Form submitted successfully!",
        statusCode: response.status,  // Return the status code
      };
    } catch (error) {
      console.error("Submission error:", error);
      return {
        success: false,
        message: "Failed to submit the form. Please try again.",
        statusCode: 500,  // General failure code
      };
    }
  }
}

export default new BusinessAvailabilityConnector();
