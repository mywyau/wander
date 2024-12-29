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
          .max(300, "Description cannot exceed 300 characters."),
      availability:
        z.object(
          {
            days:
              z
                .array(z.string())
                .refine((arr) => arr.length > 0, "At least one availability day must be selected."),
            startTime:
              z
                .string()
                .nonempty("Start time is required.")
                .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:mm format."),
            endTime:
              z
                .string()
                .nonempty("End time is required.")
                .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:mm format."),
          }
        ),
    }
  );
