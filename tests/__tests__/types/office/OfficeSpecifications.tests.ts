import { OfficeSpecifications } from "@/types/office/OfficeSpecifications";

describe("OfficeSpecifications - JSON Serialization and Deserialization", () => {

  it("should serialize OfficeSpecifications object to JSON", () => {

    const officeSpecifications: OfficeSpecifications = {
      officeName: "Downtown Office",
      description: "A modern office space in the heart of downtown.",
      officeType: "Open Plan",
      numberOfFloors: 3,
      totalDesks: 150,
      capacity: 300,
      amenities: ["Wi-Fi", "Conference Rooms", "Cafeteria"],
      availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        startTime: "09:00",
        endTime: "18:00"
      },
      rules: "No smoking, No pets allowed."
    };

    const expectedJson = JSON.stringify({
      officeName: "Downtown Office",
      description: "A modern office space in the heart of downtown.",
      officeType: "Open Plan",
      numberOfFloors: 3,
      totalDesks: 150,
      capacity: 300,
      amenities: ["Wi-Fi", "Conference Rooms", "Cafeteria"],
      availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        startTime: "09:00",
        endTime: "18:00"
      },
      rules: "No smoking, No pets allowed."
    });

    const actualJson = JSON.stringify(officeSpecifications);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an OfficeSpecifications object", () => {

    const jsonString = `{
      "officeName": "Downtown Office",
      "description": "A modern office space in the heart of downtown.",
      "officeType": "Open Plan",
      "numberOfFloors": 3,
      "totalDesks": 150,
      "capacity": 300,
      "amenities": ["Wi-Fi", "Conference Rooms", "Cafeteria"],
      "availability": {
        "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "startTime": "09:00",
        "endTime": "18:00"
      },
      "rules": "No smoking, No pets allowed."
    }`;

    const expectedObject: OfficeSpecifications = {
      officeName: "Downtown Office",
      description: "A modern office space in the heart of downtown.",
      officeType: "Open Plan",
      numberOfFloors: 3,
      totalDesks: 150,
      capacity: 300,
      amenities: ["Wi-Fi", "Conference Rooms", "Cafeteria"],
      availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        startTime: "09:00",
        endTime: "18:00"
      },
      rules: "No smoking, No pets allowed."
    };

    const actualObject = JSON.parse(jsonString) as OfficeSpecifications;
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle an empty amenities array correctly", () => {

    const officeSpecifications: OfficeSpecifications = {
      officeName: "Small Office",
      description: "A small office space.",
      officeType: "Private",
      numberOfFloors: 1,
      totalDesks: 10,
      capacity: 20,
      amenities: [],
      availability: {
        days: ["Monday", "Tuesday"],
        startTime: "10:00",
        endTime: "16:00"
      },
      rules: "Quiet hours after 2 PM."
    };

    const expectedJson = JSON.stringify({
      officeName: "Small Office",
      description: "A small office space.",
      officeType: "Private",
      numberOfFloors: 1,
      totalDesks: 10,
      capacity: 20,
      amenities: [],
      availability: {
        days: ["Monday", "Tuesday"],
        startTime: "10:00",
        endTime: "16:00"
      },
      rules: "Quiet hours after 2 PM."
    });

    const actualJson = JSON.stringify(officeSpecifications);
    expect(actualJson).toBe(expectedJson);

    const jsonString = `{
      "officeName": "Small Office",
      "description": "A small office space.",
      "officeType": "Private",
      "numberOfFloors": 1,
      "totalDesks": 10,
      "capacity": 20,
      "amenities": [],
      "availability": {
        "days": ["Monday", "Tuesday"],
        "startTime": "10:00",
        "endTime": "16:00"
      },
      "rules": "Quiet hours after 2 PM."
    }`;

    const expectedObject: OfficeSpecifications = {
      officeName: "Small Office",
      description: "A small office space.",
      officeType: "Private",
      numberOfFloors: 1,
      totalDesks: 10,
      capacity: 20,
      amenities: [],
      availability: {
        days: ["Monday", "Tuesday"],
        startTime: "10:00",
        endTime: "16:00"
      },
      rules: "Quiet hours after 2 PM."
    };

    const actualObject = JSON.parse(jsonString) as OfficeSpecifications;
    expect(actualObject).toEqual(expectedObject);
  });
});
