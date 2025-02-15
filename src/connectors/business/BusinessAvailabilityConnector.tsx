import { AppConfig } from '@/config/AppConfig';
import { OpeningHours } from '@/types/OpeningHours';
import { toStringFormat } from '@/types/LocalTime';

interface BusinessAvailabilityConnectorResult {
  success: boolean;
  message: string;
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
      days: data
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

export default new BusinessAvailabilityConnector();
