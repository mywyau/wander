import { z } from "zod";

export const businessSpecificationsFormSchema = z
  .object(
    {
      businessName:
        z
          .string()
          .nonempty("Business name cannot be empty.")
          .min(3, "Business name must be at least 3 characters.")
          .max(50, "Business name cannot exceed 50 characters."),
      description:
        z
          .string()
          .nonempty("Description is required for the business.")
          .min(10, "Description must be at least 10 characters.")
          .max(300, "Description cannot exceed 300 characters.")
    }
  );
