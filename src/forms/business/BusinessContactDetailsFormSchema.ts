import { z } from "zod";

export const businessContactDetailsSchema = z
  .object(
    {
      primaryContactFirstName: z
        .string()
        .nonempty("First name is required.")
        .min(2, "First name must be at least 2 characters.")
        .max(50, "First name cannot exceed 50 characters.")
        .regex(/^[A-Za-z\s'-]+$/, "First name can only contain letters, spaces, hyphens, or apostrophes."),
      primaryContactLastName: z
        .string()
        .nonempty("Last name is required.")
        .min(2, "Last name must be at least 2 characters.")
        .max(50, "Last name cannot exceed 50 characters.")
        .regex(/^[A-Za-z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, or apostrophes."),
      contactEmail: z
        .string()
        .email("Invalid email address.")
        .max(100, "Email address cannot exceed 100 characters."),
      contactNumber: z
        .string()
        .nonempty("Contact number is required.")
        .regex(
          /^(?:\+44|0)(?:7\d{9}|[1-9]\d{2}\s?\d{3}\s?\d{3,4})$/,
          "Contact number must be a valid UK phone number."
        )
        .min(10, "Contact number must be at least 10 digits.")
        .max(15, "Contact number cannot exceed 15 digits."),
        websiteUrl: z
        .string()
        .max(100, "First name cannot exceed 50 characters.")
    }
  );