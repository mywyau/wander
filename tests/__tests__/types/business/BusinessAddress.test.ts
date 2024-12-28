import { BusinessAddressDetails } from "@/types/business/BusinessAddressDetails";

describe("BusinessAddressDetails - JSON Serialization and Deserialization", () => {

  it("should serialize BusinessAddressDetails object to JSON", () => {

    const businessSpecs: BusinessAddressDetails = {
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey_business",
      buildingName: "building_1",
      floorNumber: "1",
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      county: "123_county",
      postcode: "123 cf3",
      latitude: 100.1,
      longitude: -100.1,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    }

    const expectedJson = JSON.stringify(
      {
        id: 1,
        userId: "user_id_1",
        businessId: "business_id_1",
        businessName: "mikey_business",
        buildingName: "building_1",
        floorNumber: "1",
        street: "123 main street",
        city: "123_city",
        country: "123_country",
        county: "123_county",
        postcode: "123 cf3",
        latitude: 100.1,
        longitude: -100.1,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z"
      }
    );

    const actualJson = JSON.stringify(businessSpecs);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an BusinessAddressDetails object", () => {

    const jsonString = `{
        "id": 1,
        "userId": "user_id_1",
        "businessId": "business_id_1",
        "businessName": "mikey_business",
        "buildingName": "building_1",
        "floorNumber": "1",
        "street": "123 main street",
        "city": "123_city",
        "country": "123_country",
        "county": "123_county",
        "postcode": "123 cf3",
        "latitude": 100.1,
        "longitude": -100.1,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      }`;

    const expectedObject: BusinessAddressDetails = {
      id: 1,
      userId: "user_id_1",
      businessId: "business_id_1",
      businessName: "mikey_business",
      buildingName: "building_1",
      floorNumber: "1",
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      county: "123_county",
      postcode: "123 cf3",
      latitude: 100.1,
      longitude: -100.1,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    }


    const actualObject = JSON.parse(jsonString) as BusinessAddressDetails;
    expect(actualObject).toEqual(expectedObject);
  });
});
