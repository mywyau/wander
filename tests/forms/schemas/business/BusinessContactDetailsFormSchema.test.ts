import { businessContactDetailsFormSchema } from "@/forms/business/schemas/BusinessContactDetailsFormSchema";

describe("businessContactDetailsFormSchema", () => {
    
    const validData = {
        primaryContactFirstName: "John",
        primaryContactLastName: "Doe",
        contactEmail: "john.doe@example.com",
        contactNumber: "+447123456789",
        websiteUrl: "https://example.com",
    };

    it("validates correct data successfully", () => {
        expect(() => businessContactDetailsFormSchema.parse(validData)).not.toThrow();
    });

    it("throws an error if primaryContactFirstName is invalid", () => {
        const invalidData = { ...validData, primaryContactFirstName: "J0hn!" };
        expect(() => businessContactDetailsFormSchema.parse(invalidData)).toThrow(
            "First name can only contain letters, spaces, hyphens, or apostrophes."
        );
    });

    it("throws an error if primaryContactLastName is too short", () => {
        const invalidData = { ...validData, primaryContactLastName: "A" };
        expect(() => businessContactDetailsFormSchema.parse(invalidData)).toThrow(
            "Last name must be at least 2 characters."
        );
    });

    it("throws an error if contactEmail is invalid", () => {
        const invalidData = { ...validData, contactEmail: "invalid-email" };
        expect(() => businessContactDetailsFormSchema.parse(invalidData)).toThrow("Invalid email address.");
    });

    it("throws an error if contactNumber is not a valid UK phone number", () => {
        const invalidData = { ...validData, contactNumber: "12345" };
        expect(() => businessContactDetailsFormSchema.parse(invalidData)).toThrow(
            "Contact number must be a valid UK phone number."
        );
    });

    it("throws an error if contactNumber is too short", () => {
        const invalidData = { ...validData, contactNumber: "123" };
        expect(() => businessContactDetailsFormSchema.parse(invalidData)).toThrow(
            "Contact number must be at least 10 digits."
        );
    });

    it("allows websiteUrl to be optional", () => {
        const dataWithoutWebsite = { ...validData };
        delete dataWithoutWebsite.websiteUrl;

        expect(() => businessContactDetailsFormSchema.parse(dataWithoutWebsite)).not.toThrow();
    });

    it("throws an error if websiteUrl exceeds the maximum length", () => {
        const invalidData = { ...validData, websiteUrl: "https://".padEnd(102, "a") };
        expect(() => businessContactDetailsFormSchema.parse(invalidData)).toThrow(
            "First name cannot exceed 50 characters."
        );
    });
});
