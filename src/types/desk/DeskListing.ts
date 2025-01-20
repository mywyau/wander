import { DeskPricing } from "./DeskPricing";
import { DeskSpecifications } from "./DeskSpecifications";

export interface DeskListing {
  deskId: string;
  specifications?: DeskSpecifications;
  pricing?: DeskPricing;
}


