
interface DeskAvailability {
    deskType: string;
    quantity: number;
    features: string[];
    availability: DeskAvailability,
    rules?: string;
}