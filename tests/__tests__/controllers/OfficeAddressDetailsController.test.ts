import AppConfig from '@/config/AppConfig';
import OfficeAddressDetailsController from '@/controllers/office/OfficeAddressDetailsController';
import { OfficeAddressDetails } from '@/types/office/OfficeAddressDetails';

global.fetch = jest.fn(); // Mock the global fetch function

describe("OfficeAddressDetailsController", () => {
    
    const mockData: OfficeAddressDetails = {
        buildingName: "Building A",
        street: "123 Main Street",
        city: "Metropolis",
        country: "Wonderland",
        county: "Central",
        postcode: "12345",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully submit form data", async () => {
        // Mock AppConfig to return a base URL
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        // Mock fetch to return a successful response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true, message: "Success" }),
        });

        const result = await OfficeAddressDetailsController.submitForm(mockData);

        expect(result).toEqual({
            success: true,
            message: "Form submitted successfully!",
        });

        expect(fetch).toHaveBeenCalledWith(
            "http://mocked-pistachio-url/pistachio/business/offices/address/create",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...mockData,
                    businessId: "BUS123456",
                    officeId: "OFF123456",
                    floorNumber: "1",
                    latitude: 999,
                    longitude: 999,
                }),
            })
        );
    });

    it("should return an error message if the submission fails", async () => {
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const result = await OfficeAddressDetailsController.submitForm(mockData);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });

    it("should handle exceptions during the submission process", async () => {
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        const result = await OfficeAddressDetailsController.submitForm(mockData);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });
});
