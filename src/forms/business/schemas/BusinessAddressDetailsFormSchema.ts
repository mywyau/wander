import { z } from "zod";

export const businessAddressDetailsFormSchema =
  z.object({
    buildingName: z
      .string()
      .max(50, "Building name cannot exceed 50 characters.")
      .optional(),
    street: z
      .string({
        required_error: "Street name is required.",
      })
      .nonempty("Street name is required.")
      .min(3, "Street name must be at least 3 characters.")
      .max(100, "Street name cannot exceed 100 characters."),
    city: z
      .string({
        required_error: "City is required.",
      })
      .nonempty("City is required.")
      .min(2, "City name must be at least 2 characters.")
      .max(50, "City name cannot exceed 50 characters."),
    country: z
      .string({
        required_error: "Country is required.",
      })
      .nonempty("Country is required.")
      .min(2, "Country name must be at least 2 characters.")
      .max(50, "Country name cannot exceed 50 characters."),
    county: z
      .string()
      .max(50, "County name cannot exceed 50 characters.")
      .optional(),
    postcode: z
      .string({
        required_error: "Postcode is required.",
      })
      .nonempty("Postcode is required.")
      .regex(/^[A-Za-z0-9\s-]+$/, "Postcode must only contain letters, numbers, spaces, or hyphens.")
      .min(5, "Postcode must be at least 5 characters.")
      .max(10, "Postcode cannot exceed 10 characters."),
  });
