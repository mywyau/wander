
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

    const { addressDetails, contactDetails, specifications } = office;
    const amenities = specifications.amenities || [];

    return (
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{specifications.officeName}</h1>
        <p className="text-gray-600 mb-6">{specifications.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Address</h2>
            <p><strong>Building Name:</strong> {addressDetails.buildingName}</p>
            <p><strong>Street:</strong> {addressDetails.street}</p>
            <p><strong>City:</strong> {addressDetails.city}</p>
            <p><strong>Postcode:</strong> {addressDetails.postcode}</p>
            <p><strong>Country:</strong> {addressDetails.country}</p>
            <p><strong>County:</strong> {addressDetails.county}</p>

            <div className="mt-4 flex gap-6">
              <Link href={`/office/address/add/${officeId}`} className="text-blue-600 underline">
                Edit Address Details
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Contact Information</h2>
            <p>
              <strong>Primary Contact Name:</strong>{` ${contactDetails.primaryContactFirstName} ${contactDetails.primaryContactLastName}`}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactDetails.contactEmail}`} className="text-blue-500 hover:underline">
                {contactDetails.contactEmail}
              </a>
            </p>
            <p><strong>Phone:</strong> {contactDetails.contactNumber}</p>
            <div className="mt-4 flex gap-6">
              <Link href={`/office/contact-details/add/${officeId}`} className="text-blue-600 underline">
                Edit Contact Details
              </Link>
            </div>
          </div>

          {/* Office Specifications Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Office Details</h2>
            <p><strong>Rules:</strong> {specifications.rules}</p>
            <p><strong>Amenities:</strong> {amenities.length > 0 ? amenities.join(", ") : "No amenities available"}</p>
            <p><strong>Number of Desks:</strong> {specifications.totalDesks}</p>
            <p><strong>Office Type:</strong> {specifications.officeType}</p>
            <p><strong>Total Capacity:</strong> {specifications.capacity}</p>
            <div className="mt-4 flex gap-6">
              <Link href={`/office/specifications/add/${officeId}`} className="text-blue-600 underline">
                Edit Specifications
              </Link>
            </div>
          </div>
          {/* Corrected Button Logic */}
          <div>
            <Link
              href={`/desk-listing/view-all/${officeId}`}
              className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            >
              View All Desks for this office
            </Link>
          </div>


        </div>
      </div>
    );
  } catch (error) {
    console.error("[OfficeDetailedView] Error fetching office details:", error);
    notFound(); // Redirect to 404 if an error occurs
  }
}
