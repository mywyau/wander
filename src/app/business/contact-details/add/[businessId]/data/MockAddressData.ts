import { BusinessAddressDetails } from "../types/BusinessAddressDetails";

// Mock data aligned with BusinessAddressDetails schema
const mockAddresses: BusinessAddressDetails[] = [
    {
        id: 1,
        userId: "userId_1",
        businessId: "business_1",
        businessName: "mikey corp",
        buildingName: "Building A",
        floorNumber: "1",
        street: "123 Main Street",
        city: "New York",
        country: "United States",
        county: "New York County",
        postcode: "10001",
        latitude: 40.712776,
        longitude: -74.005974,
        createdAt: new Date().toISOString().slice(0, 19),
        updatedAt: new Date().toISOString().slice(0, 19),
    },
    {
        id: 2,
        userId: "userId_2",
        businessId: "business_1",
        businessName: "mikey corp 2",
        buildingName: "Building B",
        floorNumber: "2",
        street: "456 Elm Street",
        city: "San Francisco",
        country: "United States",
        county: "San Francisco County",
        postcode: "94102",
        latitude: 37.774929,
        longitude: -122.419418,
        createdAt: new Date().toISOString().slice(0, 19),
        updatedAt: new Date().toISOString().slice(0, 19),
    },
];

export default mockAddresses;