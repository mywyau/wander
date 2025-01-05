import { BusinessAvailability } from "./BusinessAvailability";

export interface BusinessListingCard {
  businessId: string,
  businessName: string,
  description: string
}

export interface BusinessListing {
  businessId: string,
  addressDetails: BusinessAddressDetails,
  contactDetails: BusinessContactDetails,
  specifications: BusinessSpecifications
}

export interface BusinessAddressDetails {
  businessId: string,
  buildingName?: string,
  floorNumber?: string,
  street?: string,
  city?: string,
  country?: string,
  county?: string,
  postcode?: string,
  latitude?: number,
  longitude?: number
}

export interface BusinessContactDetails {
  businessId: string,
  primaryContactFirstName?: string,
  primaryContactLastName?: string,
  contactEmail?: string,
  contactNumber?: string
}


export interface BusinessSpecifications {
  businessId: string,
  businessName: string,
  description: string,
  availability?: BusinessAvailability
}