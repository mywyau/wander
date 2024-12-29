import { z } from "zod";

export const businessAddressDetailsFormSchema =
  z.object(
    {
      businessName: z
        .string()
        .nonempty("Business name is required.")
        .min(0, "Business name must be at least 2 characters.")
        .max(50, "Business name cannot exceed 50 characters."),
      buildingName: z
        .string()
        .min(0, "Building name must be at least 2 characters.")
        .max(50, "Building name cannot exceed 50 characters."),
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
        // .nonempty("County is required.")
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
