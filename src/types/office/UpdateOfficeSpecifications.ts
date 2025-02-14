import { OpeningHours } from "../OpeningHours";

export interface UpdateOfficeSpecifications {
  officeName: string;
  description: string;
  officeType: string;
  numberOfFloors: number;
  totalDesks: number;
  capacity: number;
  amenities: string[];
  openingHours: OpeningHours;
  rules: string;
}
