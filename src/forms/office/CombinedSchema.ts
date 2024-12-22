import { z } from "zod";
import { officeSpecsSchema, addressDetailsSchema, contactDetailsSchema } from "./FormValidations";

export const combinedSchema = z.object({
  officeSpecs: officeSpecsSchema, // Reuse the existing officeSpecsSchema
  addressDetails: addressDetailsSchema, // Reuse the existing addressDetailsSchema
  contactDetails: contactDetailsSchema, // Reuse the existing contactDetailsSchema
});

// Export the inferred TypeScript type for type safety
export type CombinedFormData = z.infer<typeof combinedSchema>;
