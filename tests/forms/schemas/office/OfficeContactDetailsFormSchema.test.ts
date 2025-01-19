import { officeAddressDetailsFormSchema } from "@/forms/office/schemas/OfficeAddressFormSchema";

describe("officeAddressDetailsFormSchema", () => {

    it("should validate a correct office address", () => {
        const validData = {
            buildingName: "Office Tower",
            street: "123 Main Street",
            city: "Metropolis",
            country: "Wonderland",
            county: "Central",
            postcode: "12345-6789",
        };

        expect(() => officeAddressDetailsFormSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidData = {
            buildingName: "",
            street: "",
            city: "",
            country: "",
            postcode: "",
        };

        expect(() => officeAddressDetailsFormSchema.parse(invalidData)).toThrow();
    });

    it("should throw an error for invalid buildingName length", () => {
        const invalidData = {
            buildingName: "A",
            street: "123 Main Street",
            city: "Metropolis",
            country: "Wonderland",
            county: "Central",
            postcode: "12345",
        };

        expect(() => officeAddressDetailsFormSchema.parse(invalidData)).not.toThrow();
    });

    it("should throw an error for invalid street length", () => {
        const invalidData = {
            buildingName: "Office Tower",
            street: "St",
            city: "Metropolis",
            country: "Wonderland",
            county: "Central",
            postcode: "12345",
        };

        expect(() => officeAddressDetailsFormSchema.parse(invalidData)).toThrow(
            "Street name must be at least 3 characters."
        );
    });

    it("should throw an error for invalid postcode format", () => {
        const invalidData = {
            buildingName: "Office Tower",
            street: "123 Main Street",
            city: "Metropolis",
            country: "Wonderland",
            county: "Central",
            postcode: "@@@@@",
        };

        expect(() => officeAddressDetailsFormSchema.parse(invalidData)).toThrow(
            "Postcode must only contain letters, numbers, spaces, or hyphens."
        );
    });

    it("should throw an error for too long city name", () => {
        const invalidData = {
            buildingName: "Office Tower",
            street: "123 Main Street",
            city: "M".repeat(51),
            country: "Wonderland",
            county: "Central",
            postcode: "12345",
        };

        expect(() => officeAddressDetailsFormSchema.parse(invalidData)).toThrow(
            "City name cannot exceed 50 characters."
        );
    });

    it("should allow optional county field to be empty", () => {
        const validData = {
            buildingName: "Office Tower",
            street: "123 Main Street",
            city: "Metropolis",
            country: "Wonderland",
            county: "",
            postcode: "12345-6789",
        };

        expect(() => officeAddressDetailsFormSchema.parse(validData)).not.toThrow();
    });
});
