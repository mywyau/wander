// __tests__/updatedUserAddress.test.ts

import { UpdatedUserAddress } from "@/app/user/account/profile/types/User";

describe("UpdatedUserAddress JSON Serialization and Deserialization", () => {
  it("should serialize an UpdatedUserAddress object to JSON", () => {
    // Mock object of UpdatedUserAddress
    const userAddress: UpdatedUserAddress = {
      street: "123 Main St",
      city: "Anytown",
      country: "USA",
      county: "SomeCounty",
      postcode: "12345",
    };

    // Expected JSON string
    const expectedJson = JSON.stringify({
      street: "123 Main St",
      city: "Anytown",
      country: "USA",
      county: "SomeCounty",
      postcode: "12345",
    });

    // Actual JSON string
    const actualJson = JSON.stringify(userAddress);

    // Assert the JSON strings match
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an UpdatedUserAddress object", () => {
    // Mock JSON string
    const jsonString = `{
      "street": "456 Another St",
      "city": "Othertown",
      "country": "Canada",
      "county": "OtherCounty",
      "postcode": "54321"
    }`;

    // Expected UpdatedUserAddress object
    const expectedObject: UpdatedUserAddress = {
      street: "456 Another St",
      city: "Othertown",
      country: "Canada",
      county: "OtherCounty",
      postcode: "54321",
    };

    // Deserialize JSON string to object
    const actualObject = JSON.parse(jsonString) as UpdatedUserAddress;

    // Assert the deserialized object matches the expected object
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle missing optional fields during deserialization", () => {
    // Mock JSON string with missing fields
    const jsonString = `{
      "street": "789 Street Ln",
    
