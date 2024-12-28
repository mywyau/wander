import { OfficeAddressDetailsForm } from "@/types/office/OfficeAddressDetails";

describe("OfficeAddressDetails - JSON Serialization and Deserialization", () => {

  it("should serialize OfficeAddressDetails object to JSON", () => {

    const officeAddress: OfficeAddressDetailsForm = {
      buildingName: "building_1",
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      county: "123_county",
      postcode: "123 cf3"
    };

    const expectedJson = JSON.stringify({
      buildingName: "building_1",
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      county: "123_county",
      postcode: "123 cf3"
    });

    const actualJson = JSON.stringify(officeAddress);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an OfficeAddressDetails object", () => {

    const jsonString = `{
      "buildingName": "building_1",
      "street": "123 main street",
      "city": "123_city",
      "country": "123_country",
      "county": "123_county",
      "postcode": "123 cf3"
    }`;

    const expectedObject: OfficeAddressDetailsForm = {
      buildingName: "building_1",
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      county: "123_county",
      postcode: "123 cf3"
    };

    const actualObject = JSON.parse(jsonString) as OfficeAddressDetailsForm;
    expect(actualObject).toEqual(expectedObject);
  });

  it("should handle optional fields correctly", () => {

    const officeAddress: OfficeAddressDetailsForm = {
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      postcode: "123 cf3"
    };

    const expectedJson = JSON.stringify({
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      postcode: "123 cf3"
    });

    const actualJson = JSON.stringify(officeAddress);
    expect(actualJson).toBe(expectedJson);

    const jsonString = `{
      "street": "123 main street",
      "city": "123_city",
      "country": "123_country",
      "postcode": "123 cf3"
    }`;

    const expectedObject: OfficeAddressDetailsForm = {
      street: "123 main street",
      city: "123_city",
      country: "123_country",
      postcode: "123 cf3"
    };

    const actualObject = JSON.parse(jsonString) as OfficeAddressDetailsForm;
    expect(actualObject).toEqual(expectedObject);
  });
});
