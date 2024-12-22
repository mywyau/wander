
export interface OfficeSpecifications {
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
  availability: OfficeAvailability;
  rules: string;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeAvailability {
  days: string[];
  startTime: string;
  endTime: string;
}
