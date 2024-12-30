import { CreateOfficeContactDetails } from "@/types/office/CreateOfficeContactDetails";

describe("OfficeContactDetails - JSON Serialization and Deserialization", () => {

  it("should serialize OfficeContactDetails object to JSON", () => {

    const officeContactDetails: CreateOfficeContactDetails = {
      primaryContactFirstName: "John",
      primaryContactLastName: "Doe",
      contactEmail: "john.doe@example.com",
      contactNumber: "123-456-7890"
    };

    const expectedJson = JSON.stringify({
      primaryContactFirstName: "John",
      primaryContactLastName: "Doe",
      contactEmail: "john.doe@example.com",
      contactNumber: "123-456-7890"
    });

    const actualJson = JSON.stringify(officeContactDetails);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to an OfficeContactDetails object", () => {

    const jsonString = `{
      "primaryContactFirstName": "John",
      "primaryContactLastName": "Doe",
      "contactEmail": "john.doe@example.com",
      "contactNumber": "123-456-7890"
    }`;

    const expectedObject: CreateOfficeContactDetails = {
      primaryContactFirstName: "John",
      primaryContactLastName: "Doe",
      contactEmail: "john.doe@example.com",
      contactNumber: "123-456-7890"
    };

    const actualObject = JSON.parse(jsonString) as CreateOfficeContactDetails;
    expect(actualObject).toEqual(expectedObject);
  });
});
