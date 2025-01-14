import AppConfig from '@/config/AppConfig';
import BusinessSpecificationsController from '@/controllers/business/BusinessSpecificationsController';
import { CreateBusinessSpecifications } from '@/types/business/CreateBusinessSpecifications';

global.fetch = jest.fn(); // Mock the global fetch function

describe("BusinessSpecificationsController", () => {

  const businessId = "BUS123"
  const backendUrl = `http://mocked-pistachio-url/pistachio/business/businesses/specifications/update/${businessId}`

  const mockData: CreateBusinessSpecifications = {
    businessName: "Tech Innovations",
    description: "Leading technology solutions provider.",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday"],
      startTime: "09:00",
      endTime: "17:00",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully submit business specifications data", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully!" }),
    });

    const result = await BusinessSpecificationsController.submitForm(mockData, businessId);

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
          ...mockData
        }),
      })
    );
  });

  it("should return an error message if the submission fails", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await BusinessSpecificationsController.submitForm(mockData, businessId);

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

    const result = await BusinessSpecificationsController.submitForm(mockData, businessId);

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
