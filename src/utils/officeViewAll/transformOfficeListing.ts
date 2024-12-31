import { OfficeListing } from "@/types/office/OfficeListing";


const transformOfficeListing = (office: OfficeListing): OfficeListing => {
    return {
        officeId: office.officeId || "N/A",
        officeAddressDetails: {
            id: office.officeAddressDetails?.id || Date.now(),
            businessId: office.officeAddressDetails?.businessId || "Unknown",
            officeId: office.officeId || "N/A",
            buildingName: office.officeAddressDetails?.buildingName || "N/A",
            floorNumber: office.officeAddressDetails?.floorNumber || "N/A",
            street: office.officeAddressDetails?.street || "TBD",
            city: office.officeAddressDetails?.city || "TBD",
            country: office.officeAddressDetails?.country || "TBD",
            county: office.officeAddressDetails?.county || "TBD",
            postcode: office.officeAddressDetails?.postcode || "TBD",
            latitude: office.officeAddressDetails?.latitude || null,
            longitude: office.officeAddressDetails?.longitude || null,
            createdAt: office.officeAddressDetails?.createdAt || new Date().toISOString(),
            updatedAt: office.officeAddressDetails?.updatedAt || new Date().toISOString(),
        },
        officeContactDetails: {
            id: office.officeContactDetails?.id || Date.now(),
            businessId: office.officeContactDetails?.businessId || "Unknown",
            officeId: office.officeId || "N/A",
            primaryContactFirstName: office.officeContactDetails?.primaryContactFirstName || "TBD",
            primaryContactLastName: office.officeContactDetails?.primaryContactLastName || "TBD",
            contactEmail: office.officeContactDetails?.contactEmail || "TBD",
            contactNumber: office.officeContactDetails?.contactNumber || "TBD",
            createdAt: office.officeContactDetails?.createdAt || new Date().toISOString(),
            updatedAt: office.officeContactDetails?.updatedAt || new Date().toISOString(),
        },
        officeSpecifications: {
            id: office.officeSpecifications?.id || Date.now(),
            businessId: office.officeSpecifications?.businessId || "Unknown",
            officeId: office.officeId || "N/A",
            officeName: office.officeSpecifications?.officeName || "New Office",
            description: office.officeSpecifications?.description || "No description provided.",
            officeType: office.officeSpecifications?.officeType || "TBD",
            numberOfFloors: office.officeSpecifications?.numberOfFloors || 0,
            totalDesks: office.officeSpecifications?.totalDesks || 0,
            capacity: office.officeSpecifications?.capacity || 0,
            amenities: office.officeSpecifications?.amenities || [],
            availability: office.officeSpecifications?.availability || {
                days: [],
                startTime: "00:00",
                endTime: "00:00",
            },
            rules: office.officeSpecifications?.rules || "TBD",
            createdAt: office.officeSpecifications?.createdAt || new Date().toISOString(),
            updatedAt: office.officeSpecifications?.updatedAt || new Date().toISOString(),
        },
    };
};

export default transformOfficeListing;