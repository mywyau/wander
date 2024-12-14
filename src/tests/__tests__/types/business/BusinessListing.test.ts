import { BusinessListing } from "@/app/business/businesses/add/types/BusinessListing";

describe("BusinessListing - JSON Serialization and Deserialization", () => {
  
  it("should serialize a BusinessListing object to JSON", () => {
    const businessListing: BusinessListing = {
      businessId: "business_1",
      addressDetails: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        buildingName: "Building A",
        floorNumber: "2",
        street: "123 Business St",
        city: "Business City",
        country: "Business Country",
        county: "Business County",
        postcode: "12345",
        latitude: 12.34,
        longitude: 56.78,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      contactDetails: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        primaryContactFirstName: "John",
        primaryContactLastName: "Doe",
        contactEmail: "john.doe@businessone.com",
        contactNumber: "+123456789",
        websiteUrl: "https://www.businessone.com",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      businessSpecs: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        description: "A great business.",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    };

    const expectedJson = JSON.stringify({
      businessId: "business_1",
      addressDetails: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        buildingName: "Building A",
        floorNumber: "2",
        street: "123 Business St",
        city: "Business City",
        country: "Business Country",
        county: "Business County",
        postcode: "12345",
        latitude: 12.34,
        longitude: 56.78,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      contactDetails: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        primaryContactFirstName: "John",
        primaryContactLastName: "Doe",
        contactEmail: "john.doe@businessone.com",
        contactNumber: "+123456789",
        websiteUrl: "https://www.businessone.com",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      businessSpecs: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        description: "A great business.",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    });

    const actualJson = JSON.stringify(businessListing);
    expect(actualJson).toBe(expectedJson);
  });

  it("should deserialize a JSON string to a BusinessListing object", () => {
    const jsonString = `{
      "businessId": "business_1",
      "addressDetails": {
        "id": 1,
        "userId": "user_1",
        "businessId": "business_1",
        "businessName": "Business One",
        "buildingName": "Building A",
        "floorNumber": "2",
        "street": "123 Business St",
        "city": "Business City",
        "country": "Business Country",
        "county": "Business County",
        "postcode": "12345",
        "latitude": 12.34,
        "longitude": 56.78,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      },
      "contactDetails": {
        "id": 1,
        "userId": "user_1",
        "businessId": "business_1",
        "businessName": "Business One",
        "primaryContactFirstName": "John",
        "primaryContactLastName": "Doe",
        "contactEmail": "john.doe@businessone.com",
        "contactNumber": "+123456789",
        "websiteUrl": "https://www.businessone.com",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      },
      "businessSpecs": {
        "id": 1,
        "userId": "user_1",
        "businessId": "business_1",
        "businessName": "Business One",
        "description": "A great business.",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z"
    }`;

    const expectedObject: BusinessListing = {
      businessId: "business_1",
      addressDetails: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        buildingName: "Building A",
        floorNumber: "2",
        street: "123 Business St",
        city: "Business City",
        country: "Business Country",
        county: "Business County",
        postcode: "12345",
        latitude: 12.34,
        longitude: 56.78,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      contactDetails: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        primaryContactFirstName: "John",
        primaryContactLastName: "Doe",
        contactEmail: "john.doe@businessone.com",
        contactNumber: "+123456789",
        websiteUrl: "https://www.businessone.com",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      businessSpecs: {
        id: 1,
        userId: "user_1",
        businessId: "business_1",
        businessName: "Business One",
        description: "A great business.",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    };

    const actualObject = JSON.parse(jsonString) as BusinessListing;
    expect(actualObject).toEqual(expectedObject);
  });

});
