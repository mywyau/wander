import { OfficeAvailability } from "@/types/office/OfficeAvailability";

describe("OfficeAvailability - JSON Serialization and Deserialization", () => {

  it("should serialize OfficeAvailability object to JSON", () => {

    const officeAvailability: OfficeAvailability = {
      days: ["Monday", "Tuesday", "Wednesday"],
      startTime: "09:00",
      endTime: "17:00"
    };

    const expectedJson = JSON.stringify({
      days: ["Monday", "Tuesday", "Wednesday"],
      startTime: "09:00",
      endTime: "17:00"
    });

    const actualJson = JSON.stringify(officeAvailability);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an OfficeAvailability object", () => {

    const jsonString = `{
      "days": ["Monday", "Tuesday", "Wednesday"],
      "startTime": "09:00",
      "endTime": "17:00"
    }`;

    const expectedObject: OfficeAvailability = {
      days: ["Monday", "Tuesday", "Wednesday"],
      startTime: "09:00",
      endTime: "17:00"
    };

    const actualObject = JSON.parse(jsonString) as OfficeAvailability;
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle an empty days array correctly", () => {

    const officeAvailability: OfficeAvailability = {
      days: [],
      startTime: "09:00",
      endTime: "17:00"
    };

    const expectedJson = JSON.stringify({
      days: [],
      startTime: "09:00",
      endTime: "17:00"
    });

    const actualJson = JSON.stringify(officeAvailability);
    expect(actualJson).toBe(expectedJson);

    const jsonString = `{
      "days": [],
      "startTime": "09:00",
      "endTime": "17:00"
    }`;

    const expectedObject: OfficeAvailability = {
      days: [],
      startTime: "09:00",
      endTime: "17:00"
    };

    const actualObject = JSON.parse(jsonString) as OfficeAvailability;
    expect(actualObject).toEqual(expectedObject);
  });
});
