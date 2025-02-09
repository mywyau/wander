import { UpdateBusinessSpecifications } from "@/types/business/UpdateBusinessSpecifications";

describe("BusinessSpecifications - JSON Serialization and Deserialization", () => {

  it("should serialize BusinessSpecifications object to JSON", () => {
    const businessSpecifications: UpdateBusinessSpecifications = {
      businessName: "Tech Corp",
      description: "A leading technology company specializing in AI.",
      availability: {
        days: ["Monday", "Tuesday", "Wednesday"],
        startTime: "09:00",
        endTime: "17:00",
      }
    };

    const expectedJson = JSON.stringify({
      businessName: "Tech Corp",
      description: "A leading technology company specializing in AI.",
      availability: {
        days: ["Monday", "Tuesday", "Wednesday"],
        startTime: "09:00",
        endTime: "17:00",
      }
    });

    const actualJson = JSON.stringify(businessSpecifications);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to a BusinessSpecifications object", () => {
    const jsonString = `{
      "businessName": "Tech Corp",
      "description": "A leading technology company specializing in AI.",
      "availability": {
        "days": ["Monday", "Tuesday", "Wednesday"],
        "startTime": "09:00",
        "endTime": "17:00"
      }
    }`;

    const expectedObject: UpdateBusinessSpecifications = {
      businessName: "Tech Corp",
      description: "A leading technology company specializing in AI.",
      availability: {
        days: ["Monday", "Tuesday", "Wednesday"],
        startTime: "09:00",
        endTime: "17:00",
      },
    };

    const actualObject = JSON.parse(jsonString) as UpdateBusinessSpecifications;
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle an empty days array in availability correctly", () => {
    const businessSpecifications: UpdateBusinessSpecifications = {
      businessName: "Tech Corp",
      description: "A leading technology company specializing in AI.",
      availability: {
        days: [],
        startTime: "09:00",
        endTime: "17:00",
      }
    };

    const expectedJson = JSON.stringify({
      businessName: "Tech Corp",
      description: "A leading technology company specializing in AI.",
      availability: {
        days: [],
        startTime: "09:00",
        endTime: "17:00",
      }
    });

    const actualJson = JSON.stringify(businessSpecifications);
    expect(actualJson).toBe(expectedJson);

    const jsonString = `{
      "businessName": "Tech Corp",
      "description": "A leading technology company specializing in AI.",
      "availability": {
        "days": [],
        "startTime": "09:00",
        "endTime": "17:00"
      }
    }`;

    const expectedObject: UpdateBusinessSpecifications = {
      businessName: "Tech Corp",
      description: "A leading technology company specializing in AI.",
      availability: {
        days: [],
        startTime: "09:00",
        endTime: "17:00",
      }
    };

    const actualObject = JSON.parse(jsonString) as UpdateBusinessSpecifications;
    expect(actualObject).toEqual(expectedObject);
  });

  it("should throw an error when deserializing invalid JSON", () => {
    const invalidJsonString = `{
      "businessName": "Tech Corp",
      "description": "A leading technology company specializing in AI.",
      "availability": {
        "days": ["Monday", "Tuesday"],
        "startTime": "09:00",
        "invalidKey": "17:00"
      }
    }`;

    expect(() => {
      const parsedObject = JSON.parse(invalidJsonString) as Partial<UpdateBusinessSpecifications>;

      // Validate that all required keys exist
      if (
        !parsedObject.availability ||
        !parsedObject.availability.days ||
        !parsedObject.availability.startTime ||
        !parsedObject.availability.endTime
      ) {
        throw new Error("Invalid BusinessSpecifications structure");
      }
    }).toThrow("Invalid BusinessSpecifications structure");
  });

});
