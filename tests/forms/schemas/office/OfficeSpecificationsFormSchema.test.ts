import { officeSpecificationsFormSchema } from "@/forms/office/schemas/OfficeSpecificationsFormSchema";


describe("officeSpecificationsFormSchema", () => {
    it("should validate a correct office specification", () => {
        const validData = {
            officeName: "Downtown Office",
            description: "A modern office with excellent facilities.",
            officeType: "Open Plan",
            numberOfFloors: 5,
            capacity: 500,
            totalDesks: 300,
            amenities: ["Wi-Fi", "Parking", "Cafeteria"],
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
            rules: "No smoking indoors.",
        };

        expect(() => officeSpecificationsFormSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidData = {
            officeName: "",
            description: "",
            officeType: "",
            numberOfFloors: "",
            capacity: "",
            totalDesks: "",
            amenities: [],
            availability: {
                days: [],
                startTime: "",
                endTime: "",
            },
            rules: "",
        };

        expect(() => officeSpecificationsFormSchema.parse(invalidData)).toThrow();
    });

    it("should throw an error for invalid office name length", () => {
        const invalidData = {
            officeName: "AB",
            description: "A modern office with excellent facilities.",
            officeType: "Open Plan",
            numberOfFloors: 5,
            capacity: 500,
            totalDesks: 300,
            amenities: ["Wi-Fi", "Parking", "Cafeteria"],
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
            rules: "No smoking indoors.",
        };

        expect(() => officeSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Office name must be at least 3 characters."
        );
    });

    it("should throw an error for missing amenities", () => {
        const invalidData = {
            officeName: "Downtown Office",
            description: "A modern office with excellent facilities.",
            officeType: "Open Plan",
            numberOfFloors: 5,
            capacity: 500,
            totalDesks: 300,
            amenities: [],
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
            rules: "No smoking indoors.",
        };

        expect(() => officeSpecificationsFormSchema.parse(invalidData)).toThrow(
            "At least one amenity must be selected."
        );
    });

    it("should throw an error for invalid availability times", () => {
        const invalidData = {
            officeName: "Downtown Office",
            description: "A modern office with excellent facilities.",
            officeType: "Open Plan",
            numberOfFloors: 5,
            capacity: 500,
            totalDesks: 300,
            amenities: ["Wi-Fi", "Parking", "Cafeteria"],
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "invalid",
                endTime: "invalid",
            },
            rules: "No smoking indoors.",
        };

        expect(() => officeSpecificationsFormSchema.parse(invalidData)).toThrow(
            "Start time must be in HH:mm format."
        );
    });

    it("should allow optional rules to be empty", () => {
        const validData = {
            officeName: "Downtown Office",
            description: "A modern office with excellent facilities.",
            officeType: "Open Plan",
            numberOfFloors: 5,
            capacity: 500,
            totalDesks: 300,
            amenities: ["Wi-Fi", "Parking", "Cafeteria"],
            availability: {
                days: ["Monday", "Tuesday", "Wednesday"],
                startTime: "09:00",
                endTime: "17:00",
            },
            rules: "",
        };

        expect(() => officeSpecificationsFormSchema.parse(validData)).not.toThrow();
    });
});
