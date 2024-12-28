import AppConfig from '@/config/AppConfig';
import OfficeContactDetailsController from '@/controllers/office/OfficeContactDetailsController';
import { OfficeContactDetails } from '@/types/office/OfficeContactDetails';

global.fetch = jest.fn(); // Mock the global fetch function

describe("OfficeContactDetailsController", () => {

    const mockData: OfficeContactDetails = {
        primaryContactFirstName: "John",
        primaryContactLastName: "Doe",
        contactEmail: "john.doe@example.com",
        contactNumber: "07123456789"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully submit contact details", async () => {
        // Mock AppConfig to return a base URL
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        // Mock fetch to return a successful response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true, message: "Success" }),
        });

        const result = await OfficeContactDetailsController.submitForm(mockData);

        expect(result).toEqual({
            success: true,
            message: "Form submitted successfully!",
        });

        const expectedJson = 
        JSON.stringify({
            ...mockData,
            businessId: "BUS123456",
            officeId: "OFF123456"
        })

        expect(fetch).toHaveBeenCalledWith(
            "http://mocked-pistachio-url/pistachio/business/offices/contact/details/create",
            expect.objectContaining(
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: expectedJson
                }
            )
        );
    });

    it("should return an error message if the submission fails", async () => {
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const result = await OfficeContactDetailsController.submitForm(mockData);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });

    it("should handle exceptions during the submission process", async () => {
        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        const result = await OfficeContactDetailsController.submitForm(mockData);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });
});
