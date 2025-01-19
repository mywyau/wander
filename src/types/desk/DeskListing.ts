import { DeskPricing } from "./DeskPricing";
import { DeskSpecifications } from "./DeskSpecifications";

export interface DeskListing {
  deskName: string;
  description?: string;
  specifications?: DeskSpecifications;
  pricingDetails?: DeskPricing;
}


