
import OfficeListingController from "@/controllers/office/OfficeListingController";
import { OfficeListing } from "@/types/office/OfficeListing";
import Link from "next/link";
import { notFound } from "next/navigation";

interface OfficeDetailedViewProps {
  params: { 
    officeId: string, 
  };
}

export default async function OfficeDetailedView({ params }: OfficeDetailedViewProps) {

  console.log("OfficeDetailedView params:", params);

  const { officeId } = params;

  try {
    // Fetch office details server-side
    const office: OfficeListing = await OfficeListingController.getOfficeListing(officeId);
    console.log("[OfficeDetailedView] Fetched office details:", office);

    const { officeSpecifications, officeAddressDetails, officeContactDetails } = office;
    const amenities = officeSpecifications.amenities || [];

    return (
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{officeSpecifications.officeName}</h1>
        <p className="text-gray-600 mb-6">{officeSpecifications.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Address</h2>
            <p><strong>Building Name:</strong> {officeAddressDetails.buildingName}</p>
            <p><strong>Street:</strong> {officeAddressDetails.street}</p>
            <p><strong>City:</strong> {officeAddressDetails.city}</p>
            <p><strong>Postcode:</strong> {officeAddressDetails.postcode}</p>
            <p><strong>Country:</strong> {officeAddressDetails.country}</p>
            <p><strong>County:</strong> {officeAddressDetails.county}</p>
            
            <div className="mt-4 flex gap-6">
              <Link href={`/business/office/address/add/${officeId}`} className="text-blue-600 underline">
                Edit Address Details
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Contact Information</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${officeContactDetails.contactEmail}`} className="text-blue-500 hover:underline">
                {officeContactDetails.contactEmail}
              </a>
            </p>
            <p><strong>Phone:</strong> {officeContactDetails.contactNumber}</p>
            <div className="mt-4 flex gap-6">
              <Link href={`/business/office/contact-details/add/${officeId}`} className="text-blue-600 underline">
                Edit Contact Details
              </Link>
            </div>
          </div>

          {/* Office Specifications Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Office Details</h2>
            <p><strong>Number of Desks:</strong> {officeSpecifications.totalDesks}</p>
            <p><strong>Amenities:</strong> {amenities.length > 0 ? amenities.join(", ") : "No amenities available"}</p>
            <p><strong>Office Type:</strong> {officeSpecifications.officeType}</p>
            <p><strong>Total Capacity:</strong> {officeSpecifications.capacity}</p>
            <div className="mt-4 flex gap-6">
              <Link href={`/business/office/specifications/add/${officeId}`} className="text-blue-600 underline">
                Edit Specifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("[OfficeDetailedView] Error fetching office details:", error);
    notFound(); // Redirect to 404 if an error occurs
  }
}
