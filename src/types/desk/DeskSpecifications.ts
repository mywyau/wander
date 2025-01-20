
export interface DeskSpecifications {
    deskName: string;
    description: string;
    deskType: string;
    quantity: number;
    features: string[];
    availability: DeskAvailability,
    rules?: string;
}