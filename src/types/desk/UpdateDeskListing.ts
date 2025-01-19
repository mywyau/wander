
export interface UpdateDeskListing {
  deskName: string;
  description?: string;
  deskType: string;
  quantityOfDesks: number;
  features: string[];
  availability: DeskAvailability,
  rules?: string;
}