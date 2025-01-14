import AppConfig from '@/config/AppConfig';
import OfficeAddressDetailsController from '@/controllers/office/OfficeAddressDetailsController';
import { CreateOfficeAddressDetails } from '@/types/office/CreateOfficeAddressDetails';

global.fetch = jest.fn(); // Mock the global fetch function

describe("OfficeAddressDetailsController", () => {

    const officeId = "OFFICE123";
    const backendUrl = `http://mocked-pistachio-url/pistachio/business/offices/address/details/update/${officeId}`;
    
    const mockData: CreateOfficeAddressDetails = {
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

        const result = await OfficeAddressDetailsController.submitForm(mockData, officeId);

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
                    floorNumber: "3",
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

        const result = await OfficeAddressDetailsController.submitForm(mockData, officeId);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });

    it("should handle exceptions during the submission process", async () => {
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        const result = await OfficeAddressDetailsController.submitForm(mockData, officeId);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });
});
