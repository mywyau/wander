import { z } from "zod";

export const businessOpeningDaysFormSchema =
  z.object(
    {
      days:
        z
          .array(z.string())
          .refine((arr) => arr.length > 0, "At least one availability day must be selected.")
    }
  );
