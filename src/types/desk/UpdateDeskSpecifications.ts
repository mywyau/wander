import { OpeningHours } from "../OpeningHours";

export interface UpdateDeskSpecifications {
  deskName: string;
  description?: string;
  deskType: string;
  quantity: number;
  features: string[];
  openingHours: OpeningHours;
  rules?: string;
}