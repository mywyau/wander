import { OfficeAvailability } from "./OfficeAvailability";

export interface OfficeListingCard {
  businessId: string,
  officeId: string,
  officeName: string,
  description: string
}

export interface OfficeListing {
  officeId: string,
  officeAddressDetails: OfficeAddressDetails,
  officeContactDetails: OfficeContactDetails,
  officeSpecifications: OfficeSpecifications,
}

export interface OfficeAddressDetails {
  id: number,
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
  longitude?: number,
  createdAt: string,
  updatedAt: string
}

export interface OfficeContactDetails {
  id: number,
  businessId: string,
  officeId: string,
  primaryContactFirstName?: string,
  primaryContactLastName?: string,
  contactEmail?: string,
  contactNumber?: string,
  createdAt: string,
  updatedAt: string
}


export interface OfficeSpecifications {
  id: number,
  businessId: string,
  officeId: string,
  officeName: string;
  description: string;
  officeType: string;
  numberOfFloors: number;
  totalDesks: number;
  capacity: number;
  amenities: string[];
  availability: OfficeAvailability;
  rules: string;
  createdAt: string,
  updatedAt: string
}