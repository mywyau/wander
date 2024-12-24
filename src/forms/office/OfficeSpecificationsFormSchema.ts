import { z } from "zod";

export const officeSpecificationsSchema = z
  .object(
    {
      officeName:
        z
          .string()
          .nonempty("Office name cannot be empty.")
          .min(3, "Office name must be at least 3 characters.")
          .max(50, "Office name cannot exceed 50 characters."),
      description:
        z
          .string()
          .nonempty("Description is required for the office.")
          .min(10, "Description must be at least 10 characters.")
          .max(300, "Description cannot exceed 300 characters."),
      officeType:
        z
          .string()
          .nonempty("Please select an office type."),
      numberOfFloors:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(1, "Number of floors must be at least 1.").max(100, "Number of floors cannot exceed 100.")
          ),
      capacity:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(1, "Capacity at a minimum be 1.").max(10000, "Capacity cannot exceed 10000.")
          ),
      totalDesks:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(1, "Total desks must be greater than 0.").max(10000, "Total desks cannot exceed 10000")
          ),
      amenities:
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
          .nonempty("Office rules cannot be empty.")
          .min(5, "Rules must be at least 5 characters.")
          .max(200, "Rules cannot exceed 200 characters."),
    }
  );
