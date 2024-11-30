// OfficeInterfaces.ts

export interface Office {
  officeId: string;
  officeSpecs: OfficeSpecs;
  addressDetails: AddressDetails;
  contactDetails: ContactDetails;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeSpecs {
  id: number;
  businessId: string;
  officeId: string;
  officeName: string;
  description: string;
  officeType: string;
  numberOfFloors: number;
  totalDesks: number;
  capacity: number;
  amenities: string[];
  availability: Availability;
  rules: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressDetails {
  id: number;
  businessId: string;
  officeId: string;
  buildingName: string;
  floorNumber: string;
  street: string;
  city: string;
  country: string;
  county: string;
  postcode: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactDetails {
  id: number;
  businessId: string;
  officeId: string;
  primaryContactFirstName: string;
  primaryContactLastName: string;
  contactEmail: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Availability {
  days: string[];
  startTime: string;
  endTime: string;
}
