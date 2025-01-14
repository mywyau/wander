
export interface UpdateDeskListing {
  deskName: string;
  description?: string;
  deskType: string;
  quantity: number;
  pricePerHour: number;
  pricePerDay: number;
  features: string[];
  availability: DeskAvailability,
  rules?: string;
}
