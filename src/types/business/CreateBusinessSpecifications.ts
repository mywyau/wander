import { BusinessAvailability } from "./BusinessAvailability";

export interface CreateBusinessSpecifications {
  businessName: string;
  description: string;
  availability: BusinessAvailability;
}

