import { DeskPricing } from "./DeskPricing";

export interface DeskListing {
    deskName: string;
    description?: string;
    deskPricing: DeskPricing;
    deskSpecifications: DeskListing[];
  }
  

