import { UpdatedUserAddress } from "@/app/user/account/profile/types/UpdatedUserAddress";

describe("UpdatedUserAddress JSON Serialization and Deserialization", () => {
  it("should serialize an UpdatedUserAddress object to JSON", () => {
    const addressDetails: UpdatedUserAddress = {
      street: "123 Elm Street",
      city: "Springfield",
      country: "USA",
      county: "Some County",
      postcode: "12345",
    };

    // Expected JSON string
    const expectedJson = JSON.stringify({
      street: "123 Elm Street",
      city: "Springfield",
      country: "USA",
      county: "Some County",
      postcode: "12345",
    });

    // Actual JSON string
    const actualJson = JSON.stringify(addressDetails);

    // Assert the JSON strings match
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an UpdatedUserAddress object", () => {
    // Mock JSON string
    const jsonString = `{
      "street": "456 Oak Avenue",
      "city": "Metropolis",
      "country": "Canada",
      "county": "Another County",
      "postcode": "67890"
    }`;

    // Expected UpdatedUserAddress object
    const expectedObject: UpdatedUserAddress = {
      street: "456 Oak Avenue",
      city: "Metropolis",
      country: "Canada",
      county: "Another County",
      postcode: "67890",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedUserAddress;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle missing optional fields during deserialization", () => {
    // Mock JSON string with missing fields
    const jsonString = `{
      "street": "789 Pine Road",
      "city": "Smallville"
    }`;

    // Expected UpdatedUserAddress object
    const expectedObject: UpdatedUserAddress = {
      street: "789 Pine Road",
      city: "Smallville",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedUserAddress;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should remove null, undefined, or empty fields during serialization", () => {
    // Mock object with null, undefined, and empty fields
    const addressDetails: UpdatedUserAddress = {
      street: "101 Maple Lane",
      city: null,
      country: undefined,
      county: "",
      postcode: "55555",
    };

    // Clean object by removing null, undefined, or empty fields
    const cleanedJson = JSON.stringify(addressDetails, (key, value) =>
      value === null || value === undefined || value === "" ? undefined : value
    );

    // Expected cleaned JSON string
    const expectedJson = JSON.stringify({
      street: "101 Maple Lane",
      postcode: "55555",
    });

    // Assert the cleaned JSON matches the expected JSON
    expect(cleanedJson).toBe(expectedJson);
  });
});
