import AppConfig from '@/config/AppConfig';
import BusinessContactDetailsController from '@/controllers/business/BusinessContactDetailsController';
import { BusinessContactDetails } from '@/types/business/CreateBusinessContactDetails';

global.fetch = jest.fn(); // Mock the global fetch function

describe("BusinessContactDetailsController", () => {
  const mockData: BusinessContactDetails = {
    businessName: "Tech Innovations",
    primaryContactFirstName: "John",
    primaryContactLastName: "Doe",
    contactEmail: "john.doe@example.com",
    contactNumber: "+447123456789",
    websiteUrl: "https://example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully submit business contact details data", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully!" }),
    });

    const result = await BusinessContactDetailsController.submitForm(mockData);

    expect(result).toEqual({
      success: true,
      message: "Form submitted successfully!",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/contact/details/create",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...mockData,
          userId: "USER1234567",
          businessId: "OFF1234567",
        }),
      })
    );
  });

  it("should return an error message if the submission fails", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await BusinessContactDetailsController.submitForm(mockData);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/contact/details/create",
      expect.any(Object)
    );
  });

  it("should handle exceptions during the submission process", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await BusinessContactDetailsController.submitForm(mockData);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/businesses/contact/details/create",
      expect.any(Object)
    );
  });
});
