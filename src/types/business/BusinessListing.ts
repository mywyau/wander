import { BusinessAvailability } from "./BusinessAvailability";

export interface BusinessListingCard {
  businessId: string,
  businessName: string,
  description: string
}

export interface BusinessListing {
  businessId: string,
  addressDetails: BusinessAddressDetails,
  businessContactDetails: BusinessContactDetails,
  businessSpecs: BusinessSpecifications
}

export interface BusinessAddressDetails {
  id: number,
  businessId: string,
  buildingName?: string,
  floorNumber?: string,
  street?: string,
  city?: string,
  country?: string,
  county?: string,
  postcode?: string,
  latitude?: number,
  longitude?: number,
  createdAt: string,
  updatedAt: string
}

export interface BusinessContactDetails {
  id: number,
  businessId: string,
  primaryContactFirstName?: string,
  primaryContactLastName?: string,
  contactEmail?: string,
  contactNumber?: string,
  createdAt: string,
  updatedAt: string
}


export interface BusinessSpecifications {
  id: number,
  businessId: string,
  businessName: string,
  description: string,
  availability?: BusinessAvailability,
  createdAt: string,
  updatedAt: string
}