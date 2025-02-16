import { businessSpecificationsFormSchema } from "@/forms/business/schemas/BusinessSpecificationsFormSchema";

describe("businessSpecificationsFormSchema", () => {
    it("should validate correct business specifications", () => {
        const validData = {
            businessName: "Tech Corp",
            description: "A leading technology company specializing in AI."
        };

        expect(() => businessSpecificationsFormSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidData = {
            businessName: "",
            description: ""
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow();
    });

    it("should throw an error for invalid business name length", () => {
        const invalidData = {
            businessName: "AB",
            description: "A leading technology company specializing in AI."
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Business name must be at least 3 characters."
        );
    });

    it("should throw an error if description is too short", () => {
        const invalidData = {
            businessName: "Tech Corp",
            description: "Short"
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Description must be at least 10 characters."
        );
    });

    it("should allow valid data with multiple availability days", () => {
        const validData = {
            businessName: "Tech Corp",
            description: "A leading technology company specializing in AI."
        };

        expect(() => businessSpecificationsFormSchema.parse(validData)).not.toThrow();
    });
});