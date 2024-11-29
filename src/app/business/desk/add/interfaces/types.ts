

interface Availability {
    days: string[];
    startTime: string; // ISO 8601 string
    endTime: string; // ISO 8601 string
}

interface DeskListingRequest {
    business_id: string;
    workspace_id: string;
    title: string;
    description?: string;
    desk_type: string;
    quantity: number;
    price_per_hour: number;
    price_per_day: number;
    rules?: string;
    features: string[];
    availability: Availability;
    created_at: string;
    updated_at: string;
}
