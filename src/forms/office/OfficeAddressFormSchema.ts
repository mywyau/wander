import { z } from "zod";

export const officeAddressDetailsFormSchema =
  z.object(
    {
      buildingName: z
        .string()
        .nonempty("Building name is required.")
        .min(2, "Building name must be at least 2 characters.")
        .max(50, "Building name cannot exceed 50 characters."),
      floorNumber: z
        .string()
        .nonempty("Floor number is required.")
        .regex(/^\d+$/, "Floor number must be numeric.")
        .min(1, "Floor number must be at least 1 character.")
        .max(5, "Floor number cannot exceed 5 characters."),
      street: z
        .string()
        .nonempty("Street name is required.")
        .min(3, "Street name must be at least 3 characters.")
        .max(100, "Street name cannot exceed 100 characters."),
      city: z
        .string()
        .nonempty("City is required.")
        .min(2, "City name must be at least 2 characters.")
        .max(50, "City name cannot exceed 50 characters."),
      country: z
        .string()
        .nonempty("Country is required.")
        .min(2, "Country name must be at least 2 characters.")
        .max(50, "Country name cannot exceed 50 characters."),
      county: z
        .string()
        .nonempty("County is required.")
        .min(2, "County name must be at least 2 characters.")
        .max(50, "County name cannot exceed 50 characters."),
      postcode: z
        .string()
        .nonempty("Postcode is required.")
        .regex(/^[A-Za-z0-9\s-]+$/, "Postcode must only contain letters, numbers, spaces, or hyphens.")
        .min(5, "Postcode must be at least 5 characters.")
        .max(10, "Postcode cannot exceed 10 characters."),
    }
  );
