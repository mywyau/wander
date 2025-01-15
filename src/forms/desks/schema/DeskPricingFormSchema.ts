import { z } from "zod";

export const deskPricingFormSchema = z
  .object(
    {
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
      pricePerWeek:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(0, "Price should be 0 or above").max(10000, "Capacity cannot exceed 10000.")
          ),
      pricePerYear:
        z
          .preprocess(
            (value) => (value === "" || value === undefined ? undefined : Number(value)),
            z.number().min(0, "Price should be 0 or above").max(100000, "Capacity cannot exceed 100000.")
          ),
    }
  );
