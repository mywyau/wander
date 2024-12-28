import { OfficeAvailability } from "./OfficeAvailability";

export interface OfficeSpecifications {
  officeName: string;
  description: string;
  officeType: string;
  numberOfFloors: number;
  totalDesks: number;
  capacity: number;
  amenities: string[];
  availability: OfficeAvailability;
  rules: string;
}
