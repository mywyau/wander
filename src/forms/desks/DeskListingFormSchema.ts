import { z } from "zod";

export const deskListingFormSchema = z
  .object(
    {
      deskName:
        z
          .string()
          .nonempty("Desk name cannot be empty.")
          .min(3, "Desk name must be at least 3 characters.")
          .max(50, "Desk name cannot exceed 50 characters."),
      description:
        z
          .string()
          .nonempty("Description is required for the desk.")
          .min(10, "Description must be at least 10 characters.")
          .max(1000, "Description cannot exceed 1000 characters."),
      deskType:
        z
          .string()
          .nonempty("Please select a type of desk."),
      pricePerHour:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(0, "Price should be 0 or above").max(10000, "Capacity cannot exceed 10000.")
          ),
      pricePerDay:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(0, "Price should be 0 or above").max(10000, "Capacity cannot exceed 10000.")
          ),
      features:
        z
          .array(z.string())
          .refine((arr) => arr.length > 0, "At least one amenity must be selected."),
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
      rules:
        z
          .string()
          .max(1000, "Rules cannot exceed 1000 characters."),
    }
  );
