import AppConfig from '@/config/AppConfig';
import OfficeContactDetailsController from '@/controllers/office/OfficeContactDetailsController';
import { CreateOfficeContactDetails } from '@/types/office/CreateOfficeContactDetails';

global.fetch = jest.fn(); // Mock the global fetch function

describe("OfficeContactDetailsController", () => {

    const fakeOfficeId = "OFF123456"
    const backendUrl = `http://mocked-pistachio-url/pistachio/business/offices/contact/details/update/${fakeOfficeId}`

    const mockData: CreateOfficeContactDetails = {
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

        const result = await OfficeContactDetailsController.submitUpdateForm(mockData, fakeOfficeId);

        expect(result).toEqual({
            success: true,
            message: "Form submitted successfully!",
        });

        const expectedJson = 
        JSON.stringify({
            ...mockData
        })

        expect(fetch).toHaveBeenCalledWith(
            backendUrl,
            expect.objectContaining(
                {
                    method: "PUT",
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

        const result = await OfficeContactDetailsController.submitUpdateForm(mockData, fakeOfficeId);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });

    

    it("should handle exceptions during the submission process", async () => {

        jest.spyOn(AppConfig, 'basePistachioUrl').mockReturnValue('mocked-pistachio-url');

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        const result = await OfficeContactDetailsController.submitUpdateForm(mockData, fakeOfficeId);

        expect(result).toEqual({
            success: false,
            message: "Failed to submit the form. Please try again.",
        });
    });
});
