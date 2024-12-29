import { businessSpecificationsFormSchema } from "@/forms/business/schemas/BusinessSpecificationsFormSchema";

describe("businessSpecificationsFormSchema", () => {
    it("should validate correct business specifications", () => {
        const validData = {
            businessName: "Tech Corp",
            description: "A leading technology company specializing in AI.",
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidData = {
            businessName: "",
            description: "",
            availability: {
                days: [],
                startTime: "",
                endTime: "",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow();
    });

    it("should throw an error for invalid business name length", () => {
        const invalidData = {
            businessName: "AB",
            description: "A leading technology company specializing in AI.",
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Business name must be at least 3 characters."
        );
    });

    it("should throw an error for missing availability days", () => {
        const invalidData = {
            businessName: "Tech Corp",
            description: "A leading technology company specializing in AI.",
            availability: {
                days: [],
                startTime: "09:00",
                endTime: "17:00",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow(
            "At least one availability day must be selected."
        );
    });

    it("should throw an error for invalid availability time format", () => {
        const invalidData = {
            businessName: "Tech Corp",
            description: "A leading technology company specializing in AI.",
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "invalid",
                endTime: "invalid",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Start time must be in HH:mm format."
        );
    });

    it("should throw an error if description is too short", () => {
        const invalidData = {
            businessName: "Tech Corp",
            description: "Short",
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Description must be at least 10 characters."
        );
    });

    it("should allow valid data with multiple availability days", () => {
        const validData = {
            businessName: "Tech Corp",
            description: "A leading technology company specializing in AI.",
            availability: {
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                startTime: "09:00",
                endTime: "17:00",
            },
        };

        expect(() => businessSpecificationsFormSchema.parse(validData)).not.toThrow();
    });
});