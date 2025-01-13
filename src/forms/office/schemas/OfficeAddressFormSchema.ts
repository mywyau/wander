import { sanitizeString } from "@/forms/FormSanitationUtil";
import { z } from "zod";

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

export const officeAddressDetailsFormSchema = z.object({
  buildingName: z
    .string()
    .max(50, "Building name cannot exceed 50 characters.")
    .optional()
    .transform((val) => val ? sanitizeString(val) : val), // Apply sanitization if provided

  street: z
    .string()
    .nonempty("Street name is required.")
    .min(3, "Street name must be at least 3 characters.")
    .max(100, "Street name cannot exceed 100 characters.")
    .transform((val) => sanitizeString(val)), // Sanitize street

  city: z
    .string()
    .nonempty("City is required.")
    .min(2, "City name must be at least 2 characters.")
    .max(50, "City name cannot exceed 50 characters.")
    .transform((val) => sanitizeString(val).toLowerCase()), // Convert city to lowercase as part of sanitization

  country: z
    .string()
    .nonempty("Country is required.")
    .min(2, "Country name must be at least 2 characters.")
    .max(50, "Country name cannot exceed 50 characters.")
    .transform((val) => sanitizeString(val).toLowerCase()), // Convert country to lowercase

  county: z
    .string()
    .max(50, "County name cannot exceed 50 characters.")
    .optional()
    .transform((val) => val ? sanitizeString(val) : val), // Apply sanitization to county if provided

  postcode: z
    .string()
    .nonempty("Postcode is required.")
    .regex(/^[A-Za-z0-9\s-]+$/, "Postcode must only contain letters, numbers, spaces, or hyphens.")
    .min(5, "Postcode must be at least 5 characters.")
    .max(10, "Postcode cannot exceed 10 characters.")
    .transform((val) => sanitizeString(val)), // Trim any unwanted spaces in postcode
});
