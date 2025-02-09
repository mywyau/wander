import { BusinessAvailability } from "./BusinessAvailability";

export interface UpdateBusinessSpecifications {
  businessName: string;
  description: string;
  availability: BusinessAvailability;
}

