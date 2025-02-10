import AppConfig from '@/config/AppConfig';
import BusinessContactDetailsConnector from '@/connectors/business/BusinessContactDetailsConnector';
import { BusinessContactDetails } from '@/types/business/BusinessListing';
import { UpdateBusinessContactDetails } from '@/types/business/UpdateBusinessContactDetails';

global.fetch = jest.fn(); // Mock the global fetch function

describe("BusinessContactDetailsConnector", () => {

  const fakeBusinessId = "BUS123"
  const backendUrl = `http://mocked-pistachio-url/pistachio/business/businesses/contact/details/update/${fakeBusinessId}`

  const mockData: BusinessContactDetails = {
    userId: "USER123",
    businessId: fakeBusinessId,
    primaryContactFirstName: "John",
    primaryContactLastName: "Doe",
    contactEmail: "john.doe@example.com",
    contactNumber: "+447123456789",
    websiteUrl: "https://example.com",
  };

  const createBusinessContactDetails: UpdateBusinessContactDetails = {
    primaryContactFirstName: "John",
    primaryContactLastName: "Doe",
    contactEmail: "john.doe@example.com",
    contactNumber: "+447123456789",
    websiteUrl: "https://example.com",
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully submit create business contact details request", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully!" }),
    });

    const result = await BusinessContactDetailsConnector.submitForm(createBusinessContactDetails, fakeBusinessId);

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
          ...createBusinessContactDetails
        }),
      })
    );
  });

  it("should return an error message if the submission fails", async () => {

    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await BusinessContactDetailsConnector.submitForm(createBusinessContactDetails, fakeBusinessId);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      backendUrl,
      expect.any(Object)
    );
  });

  it("should handle exceptions during the submission process", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await BusinessContactDetailsConnector.submitForm(createBusinessContactDetails, fakeBusinessId);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      backendUrl,
      expect.any(Object)
    );
  });
});
