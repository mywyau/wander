
import { BusinessAddressDetails } from "./BusinessAddressDetails";
import { BusinessContactDetails } from "./BusinessContactDetails";
import { BusinessSpecs } from "./BusinessSpecs";

export interface BusinessListing {
  businessId: string;
  addressDetails: BusinessAddressDetails;
  contactDetails: BusinessContactDetails;
  businessSpecs: BusinessSpecs;
  createdAt: string;
  updatedAt: string;
}
