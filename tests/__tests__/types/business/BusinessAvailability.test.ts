import { BusinessAvailability } from "@/types/business/BusinessAvailability";

describe("BusinessAvailability - JSON Serialization and Deserialization", () => {

    it("should serialize BusinessAvailability object to JSON", () => {
        const businessAvailability: BusinessAvailability = {
            days: ["Monday", "Tuesday", "Wednesday"],
            startTime: "09:00",
            endTime: "17:00",
        };

        const expectedJson = JSON.stringify({
            days: ["Monday", "Tuesday", "Wednesday"],
            startTime: "09:00",
            endTime: "17:00",
        });

        const actualJson = JSON.stringify(businessAvailability);
        expect(actualJson).toBe(expectedJson);
    });

    it("should deserialize a JSON string to a BusinessAvailability object", () => {
        const jsonString = `{
      "days": ["Monday", "Tuesday", "Wednesday"],
      "startTime": "09:00",
      "endTime": "17:00"
    }`;

        const expectedObject: BusinessAvailability = {
            days: ["Monday", "Tuesday", "Wednesday"],
            startTime: "09:00",
            endTime: "17:00",
        };

        const actualObject = JSON.parse(jsonString) as BusinessAvailability;
        expect(actualObject).toEqual(expectedObject);
    });

    it("should handle an empty days array correctly", () => {
        const businessAvailability: BusinessAvailability = {
            days: [],
            startTime: "09:00",
            endTime: "17:00",
        };

        const expectedJson = JSON.stringify({
            days: [],
            startTime: "09:00",
            endTime: "17:00",
        });

        const actualJson = JSON.stringify(businessAvailability);
        expect(actualJson).toBe(expectedJson);

        const jsonString = `{
      "days": [],
      "startTime": "09:00",
      "endTime": "17:00"
    }`;

        const expectedObject: BusinessAvailability = {
            days: [],
            startTime: "09:00",
            endTime: "17:00",
        };

        const actualObject = JSON.parse(jsonString) as BusinessAvailability;
        expect(actualObject).toEqual(expectedObject);
    });


    it("should throw an error when deserializing invalid JSON", () => {
        const invalidJsonString = `{
          "days": ["Monday", "Tuesday"],
          "startTime": "09:00",
          "invalidKey": "17:00"
        }`;
      
        expect(() => {
          const parsedObject = JSON.parse(invalidJsonString) as Partial<BusinessAvailability>;
      
          // Validate that all required keys exist
          if (!parsedObject.days || !parsedObject.startTime || !parsedObject.endTime) {
            throw new Error("Invalid BusinessAvailability structure");
          }
        }).toThrow("Invalid BusinessAvailability structure");
      });
      

});
