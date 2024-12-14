
import { BusinessSpecs } from "@/app/business/businesses/add/types/BusinessSpecs";

describe("BusinessSpecs - JSON Serialization and Deserialization", () => {

  it("should serialize an BusinessSpecs object to JSON", () => {

    const businessSpecs: BusinessSpecs = {
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey corp",
      description: "some desc",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    };

    const expectedJson = JSON.stringify({
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey corp",
      description: "some desc",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    });

    const actualJson = JSON.stringify(businessSpecs);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an BusinessSpecs object", () => {

    const jsonString = `{
      "id": 1,
      "userId": "user_id_1",
      "businessId": "business_id_1",
      "businessName": "mikey corp",
      "description": "some desc",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z"
    }`;

    const expectedObject: BusinessSpecs = {
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey corp",
      description: "some desc",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    };

    const actualObject = JSON.parse(jsonString) as BusinessSpecs;
    expect(actualObject).toEqual(expectedObject);
  });
});
