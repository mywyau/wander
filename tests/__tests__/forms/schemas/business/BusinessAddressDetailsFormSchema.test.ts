import { businessAddressDetailsFormSchema } from "@/forms/business/schemas/BusinessAddressDetailsFormSchema";

describe("businessAddressDetailsFormSchema", () => {
  it("should pass validation with valid data", () => {
    const validData = {
      businessName: "Tech Corp",
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      county: "Countyshire",
      postcode: "12345",
    };

    expect(() => businessAddressDetailsFormSchema.parse(validData)).not.toThrow();
  });

  it("should fail if `businessName` is missing or invalid", () => {
    const missingBusinessName = {
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      county: "Countyshire",
      postcode: "12345",
    };

    const tooShortBusinessName = {
      ...missingBusinessName,
      businessName: "A",
    };

    const tooLongBusinessName = {
      ...missingBusinessName,
      businessName: "A".repeat(51),
    };

    expect(() => businessAddressDetailsFormSchema.parse(missingBusinessName)).toThrow("Business name is required.");
    expect(() => businessAddressDetailsFormSchema.parse(tooShortBusinessName)).toThrow("Business name must be at least 2 characters.");
    expect(() => businessAddressDetailsFormSchema.parse(tooLongBusinessName)).toThrow("Business name cannot exceed 50 characters.");
  });

  it("should fail if `street` is missing or invalid", () => {
    const missingStreet = {
      businessName: "Tech Corp",
      buildingName: "Tech Tower",
      city: "Metropolis",
      country: "Countryland",
      county: "Countyshire",
      postcode: "12345",
    };

    const tooShortStreet = {
      ...missingStreet,
      street: "12",
    };

    const tooLongStreet = {
      ...missingStreet,
      street: "A".repeat(101),
    };

    expect(() => businessAddressDetailsFormSchema.parse(missingStreet)).toThrow("Street name is required.");
    expect(() => businessAddressDetailsFormSchema.parse(tooShortStreet)).toThrow("Street name must be at least 3 characters.");
    expect(() => businessAddressDetailsFormSchema.parse(tooLongStreet)).toThrow("Street name cannot exceed 100 characters.");
  });

  it("should fail if `city` is missing or invalid", () => {
    const missingCity = {
      businessName: "Tech Corp",
      buildingName: "Tech Tower",
      street: "123 Main Street",
      country: "Countryland",
      county: "Countyshire",
      postcode: "12345",
    };

    const tooShortCity = {
      ...missingCity,
      city: "A",
    };

    const tooLongCity = {
      ...missingCity,
      city: "A".repeat(51),
    };

    expect(() => businessAddressDetailsFormSchema.parse(missingCity)).toThrow("City is required.");
    expect(() => businessAddressDetailsFormSchema.parse(tooShortCity)).toThrow("City name must be at least 2 characters.");
    expect(() => businessAddressDetailsFormSchema.parse(tooLongCity)).toThrow("City name cannot exceed 50 characters.");
  });

  it("should fail if `country` is missing or invalid", () => {
    const missingCountry = {
      businessName: "Tech Corp",
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      county: "Countyshire",
      postcode: "12345",
    };

    const tooShortCountry = {
      ...missingCountry,
      country: "A",
    };

    const tooLongCountry = {
      ...missingCountry,
      country: "A".repeat(51),
    };

    expect(() => businessAddressDetailsFormSchema.parse(missingCountry)).toThrow("Country is required.");
    expect(() => businessAddressDetailsFormSchema.parse(tooShortCountry)).toThrow("Country name must be at least 2 characters.");
    expect(() => businessAddressDetailsFormSchema.parse(tooLongCountry)).toThrow("Country name cannot exceed 50 characters.");
  });

  it("should fail if `postcode` is missing or invalid", () => {
    const missingPostcode = {
      businessName: "Tech Corp",
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      county: "Countyshire",
    };

    const invalidFormatPostcode = {
      ...missingPostcode,
      postcode: "!@#$%",
    };

    const tooShortPostcode = {
      ...missingPostcode,
      postcode: "123",
    };

    const tooLongPostcode = {
      ...missingPostcode,
      postcode: "12345678901",
    };

    expect(() => businessAddressDetailsFormSchema.parse(missingPostcode)).toThrow("Postcode is required.");
    expect(() => businessAddressDetailsFormSchema.parse(invalidFormatPostcode)).toThrow(
      "Postcode must only contain letters, numbers, spaces, or hyphens."
    );
    expect(() => businessAddressDetailsFormSchema.parse(tooShortPostcode)).toThrow("Postcode must be at least 5 characters.");
    expect(() => businessAddressDetailsFormSchema.parse(tooLongPostcode)).toThrow("Postcode cannot exceed 10 characters.");
  });

  it("should handle optional `buildingName` and `county` correctly", () => {
    const validDataWithoutOptionalFields = {
      businessName: "Tech Corp",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      postcode: "12345",
    };

    expect(() => businessAddressDetailsFormSchema.parse(validDataWithoutOptionalFields)).not.toThrow();
  });

  it("should fail if `county` is too long", () => {
    const invalidCounty = {
      businessName: "Tech Corp",
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      county: "A".repeat(51),
      postcode: "12345",
    };

    expect(() => businessAddressDetailsFormSchema.parse(invalidCounty)).toThrow("County name cannot exceed 50 characters.");
  });
});
