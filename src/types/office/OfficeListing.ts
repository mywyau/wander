import { OfficeAvailability } from "./OfficeAvailability",

export interface OfficeListingCard {
  businessId: string,
  officeId: string,
  officeName: string,
  description: string
}

export interface OfficeListing {
  officeId: string,
  addressDetails: OfficeAddressDetails,
  contactDetails: OfficeContactDetails,
  specifications: OfficeSpecifications,
}

export interface OfficeAddressDetails {
  businessId: string,
  officeId: string,
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

export interface OfficeContactDetails {
  businessId: string,
  officeId: string,
  primaryContactFirstName?: string,
  primaryContactLastName?: string,
  contactEmail?: string,
  contactNumber?: string
}


export interface OfficeSpecifications {
  businessId: string,
  officeId: string,
  officeName: string,
  description: string,
  officeType: string,
  numberOfFloors: number,
  totalDesks: number,
  capacity: number,
  amenities: string[],
  availability: OfficeAvailability,
  rules: string,
}