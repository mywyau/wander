import AppConfig from "@/config/AppConfig";
import BusinessAddressDetailsController from "@/controllers/business/BusinessAddressDetailsController";
import { BusinessAddressDetails } from "@/types/business/BusinessAddressDetails";

// Mock global `fetch` function
global.fetch = jest.fn();

describe("BusinessAddressDetailsController", () => {

  const mockData: BusinessAddressDetails = {
    buildingName: "Tech Tower",
    businessName: "Tech Corp",
    street: "123 Main Street",
    city: "Metropolis",
    country: "Countryland",
    county: "Countyshire",
    postcode: "12345",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully submit form data", async () => {
    jest.spyOn(AppConfig, "basePistachioUrl").mockReturnValue("mocked-pistachio-url");

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully!" }),
    });

    const result = await BusinessAddressDetailsController.submitForm(mockData);

    expect(result).toEqual({
      success: true,
      message: "Form submitted successfully!",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/address/details/create",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...mockData,
          userId: "USER123456",
          businessId: "BUS123456",
          floorNumber: "1",
          latitude: 999,
          longitude: 999,
        }),
      })
    );
  });

  it("should return an error message if the submission fails", async () => {
    jest.spyOn(AppConfig, "basePistachioUrl").mockReturnValue("mocked-pistachio-url");

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await BusinessAddressDetailsController.submitForm(mockData);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/address/details/create",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("should handle exceptions during the submission process", async () => {
    jest.spyOn(AppConfig, "basePistachioUrl").mockReturnValue("mocked-pistachio-url");

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await BusinessAddressDetailsController.submitForm(mockData);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/address/details/create",
      expect.any(Object)
    );
  });

  it("should include combined data with additional fields", async () => {
    jest.spyOn(AppConfig, "basePistachioUrl").mockReturnValue("mocked-pistachio-url");

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully!" }),
    });

    await BusinessAddressDetailsController.submitForm(mockData);

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/address/details/create",
      expect.objectContaining({
        body: JSON.stringify({
          ...mockData,
          userId: "USER123456",
          businessId: "BUS123456",
          floorNumber: "1",
          latitude: 999,
          longitude: 999,
        }),
      })
    );
  });
});
