import { businessAddressDetailsFormSchema } from "@/forms/business/schemas/BusinessAddressFormSchema";
import { ZodError } from "zod";

describe("businessAddressDetailsFormSchema", () => {

  it("should pass validation with valid data", () => {
    const validData = {
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      county: "Countyshire",
      postcode: "12345",
    };

    expect(() => businessAddressDetailsFormSchema.parse(validData)).not.toThrow();
  });

  it("should fail if `street` is missing or invalid", () => {
    const missingStreet = {
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

    try {
      businessAddressDetailsFormSchema.parse(missingStreet);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message;
      expect(errorMessage).toBe("Street name is required.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooShortStreet);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message;
      expect(errorMessage).toBe("Street name must be at least 3 characters.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooLongStreet);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message;
      expect(errorMessage).toBe("Street name cannot exceed 100 characters.");
    }
  });


  it("should fail if `city` is missing or invalid", () => {

    const emptyCity = {
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "",
      country: "Countryland",
      county: "Countyshire",
      postcode: "12345",
    };

    const missingCity = {
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


    try {
      businessAddressDetailsFormSchema.parse(emptyCity);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("City is required.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooShortCity);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("City name must be at least 2 characters.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooLongCity);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("City name cannot exceed 50 characters.");
    }
  });

  it("should fail if `country` is missing or invalid", () => {

    const emptyCountry = {
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      county: "Countyshire",
      postcode: "12345",
      country: ""
    };

    const missingCountry = {
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

    try {
      businessAddressDetailsFormSchema.parse(emptyCountry);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Country is required.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooShortCountry);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Country name must be at least 2 characters.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooLongCountry);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Country name cannot exceed 50 characters.");
    }
  });

  it("should fail if `postcode` is missing or invalid", () => {

    const emptyPostcode = {
      buildingName: "Tech Tower",
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      county: "Countyshire",
      postcode: ""
    };

    const missingPostcode = {
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

    try {
      businessAddressDetailsFormSchema.parse(emptyPostcode);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Postcode is required.");
    }

    try {
      businessAddressDetailsFormSchema.parse(invalidFormatPostcode);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Postcode must only contain letters, numbers, spaces, or hyphens.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooShortPostcode);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Postcode must be at least 5 characters.");
    }

    try {
      businessAddressDetailsFormSchema.parse(tooLongPostcode);
    } catch (err) {
      const zodError = err as ZodError;
      const errorMessage = zodError.errors[0].message
      expect(errorMessage).toBe("Postcode cannot exceed 10 characters.");
    }
  });

  it("should handle optional `buildingName` and `county` correctly", () => {
    const validDataWithoutOptionalFields = {
      street: "123 Main Street",
      city: "Metropolis",
      country: "Countryland",
      postcode: "12345",
    };

    expect(() => businessAddressDetailsFormSchema.parse(validDataWithoutOptionalFields)).not.toThrow();
  });


  it("should fail if `county` is too long", () => {
    const invalidCounty = {
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
