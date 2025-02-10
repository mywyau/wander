import AppConfig from "@/config/AppConfig";
import BusinessAddressDetailsConnector from "@/connectors/business/BusinessAddressDetailsConnector";
import { UpdateBusinessAddressDetails } from "@/types/business/UpdateBusinessAddressDetails";

global.fetch = jest.fn();

describe("BusinessAddressDetailsConnector", () => {

  const businessId = "BUS123"
  const backendUrl = `http://mocked-pistachio-url/pistachio/business/businesses/address/details/update/${businessId}`

  const mockData: UpdateBusinessAddressDetails = {
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

    const result = await BusinessAddressDetailsConnector.submitForm(mockData, businessId);

    expect(result).toEqual({
      success: true,
      message: "Form submitted successfully!",
    });

    expect(fetch).toHaveBeenCalledWith(
      backendUrl,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...mockData,
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

    const result = await BusinessAddressDetailsConnector.submitForm(mockData, businessId);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      backendUrl,
      expect.objectContaining({
        method: "PUT",
      })
    );
  });

  it("should handle exceptions during the submission process", async () => {
    jest.spyOn(AppConfig, "basePistachioUrl").mockReturnValue("mocked-pistachio-url");

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await BusinessAddressDetailsConnector.submitForm(mockData, businessId);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      backendUrl,
      expect.any(Object)
    );
  });

  it("should include combined data with additional fields", async () => {
    jest.spyOn(AppConfig, "basePistachioUrl").mockReturnValue("mocked-pistachio-url");

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully!" }),
    });

    await BusinessAddressDetailsConnector.submitForm(mockData, businessId);

    expect(fetch).toHaveBeenCalledWith(
      backendUrl,
      expect.objectContaining({
        body: JSON.stringify({
          ...mockData,
          floorNumber: "1",
          latitude: 999,
          longitude: 999,
        }),
      })
    );
  });
});
