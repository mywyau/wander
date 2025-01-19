import { BusinessContactDetails } from "@/types/business/CreateBusinessContactDetails";

describe("BusinessContactDetails - JSON Serialization and Deserialization", () => {

  it("should serialize a BusinessContactDetails object to JSON", () => {
    const businessContactDetails: BusinessContactDetails = {
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey corp",
      primaryContactFirstName: "John",
      primaryContactLastName: "Doe",
      contactEmail: "john.doe@mikeycorp.com",
      contactNumber: "+123456789",
      websiteUrl: "https://www.mikeycorp.com",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    };

    const expectedJson = JSON.stringify({
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey corp",
      primaryContactFirstName: "John",
      primaryContactLastName: "Doe",
      contactEmail: "john.doe@mikeycorp.com",
      contactNumber: "+123456789",
      websiteUrl: "https://www.mikeycorp.com",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    });

    const actualJson = JSON.stringify(businessContactDetails);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to a BusinessContactDetails object", () => {
    const jsonString = `{
      "id": 1,
      "userId": "user_id_1",
      "businessId": "business_id_1",
      "businessName": "mikey corp",
      "primaryContactFirstName": "John",
      "primaryContactLastName": "Doe",
      "contactEmail": "john.doe@mikeycorp.com",
      "contactNumber": "+123456789",
      "websiteUrl": "https://www.mikeycorp.com",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z"
    }`;

    const expectedObject: BusinessContactDetails = {
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey corp",
      primaryContactFirstName: "John",
      primaryContactLastName: "Doe",
      contactEmail: "john.doe@mikeycorp.com",
      contactNumber: "+123456789",
      websiteUrl: "https://www.mikeycorp.com",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    };

    const actualObject = JSON.parse(jsonString) as BusinessContactDetails;
    expect(actualObject).toEqual(expectedObject);
  });

});
