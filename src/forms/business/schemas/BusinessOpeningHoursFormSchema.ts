import { z } from "zod";

export const businessOpeningHoursFormSchema = z
  .object(
    {
      openingHours:
        z.object(
          {
            day:
              z
                .array(z.string())
                .refine((arr) => arr.length > 0, "At least one availability day must be selected."),
            openingTime:
              z
                .string()
                .nonempty("Opening time is required.")
                .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:mm format."),
            closingTime:
              z
                .string()
                .nonempty("Closing time is required.")
                .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:mm format."),
          }
        ),
    }
  );
