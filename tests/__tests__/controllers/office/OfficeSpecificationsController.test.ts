import AppConfig from '@/config/AppConfig';
import OfficeSpecificationsController from '@/controllers/office/OfficeSpecificationsController';
import { OfficeSpecifications } from '@/types/office/OfficeSpecifications';

global.fetch = jest.fn(); // Mock the global fetch function

describe("OfficeSpecificationsController", () => {
  const mockData: OfficeSpecifications = {
    officeName: "Downtown Office",
    description: "A modern office space with excellent facilities.",
    officeType: "Open Plan",
    numberOfFloors: 3,
    totalDesks: 50,
    capacity: 100,
    amenities: ["Wi-Fi", "Conference Room", "Cafeteria"],
    availability: {
      days: ["Monday", "Tuesday", "Wednesday"],
      startTime: "09:00",
      endTime: "17:00",
    },
    rules: "No smoking indoors.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully submit specifications data", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Success" }),
    });

    const result = await OfficeSpecificationsController.submitForm(mockData);

    expect(result).toEqual({
      success: true,
      message: "Form submitted successfully!",
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://mocked-pistachio-url/pistachio/business/offices/specifications/create",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...mockData,
          businessId: "BUS1337",
          officeId: "OFF1337",
        }),
      })
    );
  });

  it("should return an error message if the submission fails", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await OfficeSpecificationsController.submitForm(mockData);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });
  });

  it("should handle exceptions during the submission process", async () => {
    jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await OfficeSpecificationsController.submitForm(mockData);

    expect(result).toEqual({
      success: false,
      message: "Failed to submit the form. Please try again.",
    });
  });
});
