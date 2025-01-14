// __tests__/updatedUserLoginDetails.test.ts

import { UpdatedUserLoginDetails } from "@/app/user/account/profile/types/User";

describe("UpdatedUserLoginDetails JSON Serialization and Deserialization", () => {
  it("should serialize an UpdatedUserLoginDetails object to JSON", () => {
    // Mock object of UpdatedUserLoginDetails
    const userLoginDetails: UpdatedUserLoginDetails = {
      username: "testUser",
      passwordHash: "hashed_password",
      email: "test@example.com",
      role: "Wanderer",
    };

    // Expected JSON string
    const expectedJson = JSON.stringify({
      username: "testUser",
      passwordHash: "hashed_password",
      email: "test@example.com",
      role: "Wanderer",
    });

    // Actual JSON string
    const actualJson = JSON.stringify(userLoginDetails);

    // Assert the JSON strings match
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an UpdatedUserLoginDetails object", () => {
    // Mock JSON string
    const jsonString = `{
      "username": "testUser",
      "passwordHash": "hashed_password",
      "email": "test@example.com",
      "role": "Wanderer"
    }`;

    // Expected UpdatedUserLoginDetails object
    const expectedObject: UpdatedUserLoginDetails = {
      username: "testUser",
      passwordHash: "hashed_password",
      email: "test@example.com",
      role: "Wanderer",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedUserLoginDetails;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle missing optional fields during deserialization", () => {
    // Mock JSON string with missing fields
    const jsonString = `{
      "username": "testUser",
      "email": "test@example.com"
    }`;

    // Expected UpdatedUserLoginDetails object
    const expectedObject: UpdatedUserLoginDetails = {
      username: "testUser",
      email: "test@example.com",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedUserLoginDetails;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should remove null, undefined, or empty fields during serialization", () => {
    // Mock object with null, undefined, and empty fields
    const userLoginDetails: UpdatedUserLoginDetails = {
      username: "testUser",
      passwordHash: "",
      email: null,
      role: undefined,
    };

    // Clean object by removing null, undefined, or empty fields
    const cleanedJson = JSON.stringify(userLoginDetails, (key, value) =>
      value === null || value === undefined || value === "" ? undefined : value
    );

    // Expected cleaned JSON string
    const expectedJson = JSON.stringify({
      username: "testUser",
    });

    // Assert the cleaned JSON matches the expected JSON
    expect(cleanedJson).toBe(expectedJson);
  });
});
