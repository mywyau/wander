// __tests__/updatedPersonalDetails.test.ts

import { UpdatedPersonalDetails } from "@/types/user";

describe("UpdatedPersonalDetails JSON Serialization and Deserialization", () => {
  it("should serialize an UpdatedPersonalDetails object to JSON", () => {
    // Mock object of UpdatedPersonalDetails
    const personalDetails: UpdatedPersonalDetails = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "123456789",
      email: "john.doe@example.com",
      company: "ExampleCorp",
    };

    // Expected JSON string
    const expectedJson = JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      contactNumber: "123456789",
      email: "john.doe@example.com",
      company: "ExampleCorp",
    });

    // Actual JSON string
    const actualJson = JSON.stringify(personalDetails);

    // Assert the JSON strings match
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an UpdatedPersonalDetails object", () => {
    // Mock JSON string
    const jsonString = `{
      "firstName": "Jane",
      "lastName": "Doe",
      "contactNumber": "987654321",
      "email": "jane.doe@example.com",
      "company": "TestCorp"
    }`;

    // Expected UpdatedPersonalDetails object
    const expectedObject: UpdatedPersonalDetails = {
      firstName: "Jane",
      lastName: "Doe",
      contactNumber: "987654321",
      email: "jane.doe@example.com",
      company: "TestCorp",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedPersonalDetails;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle missing optional fields during deserialization", () => {
    // Mock JSON string with missing fields
    const jsonString = `{
      "firstName": "Alice",
      "email": "alice@example.com"
    }`;

    // Expected UpdatedPersonalDetails object
    const expectedObject: UpdatedPersonalDetails = {
      firstName: "Alice",
      email: "alice@example.com",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedPersonalDetails;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should remove null, undefined, or empty fields during serialization", () => {
    // Mock object with null, undefined, and empty fields
    const personalDetails: UpdatedPersonalDetails = {
      firstName: "Bob",
      lastName: null,
      contactNumber: undefined,
      email: "",
      company: "ExampleCorp",
    };

    // Clean object by removing null, undefined, or empty fields
    const cleanedJson = JSON.stringify(personalDetails, (key, value) =>
      value === null || value === undefined || value === "" ? undefined : value
    );

    // Expected cleaned JSON string
    const expectedJson = JSON.stringify({
      firstName: "Bob",
      company: "ExampleCorp",
    });

    // Assert the cleaned JSON matches the expected JSON
    expect(cleanedJson).toBe(expectedJson);
  });
});
