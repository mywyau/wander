import BusinessListingController from "@/controllers/business/BusinessListingController";
import { BusinessListing } from "@/types/business/BusinessListing";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BusinessDetailedViewProps {
  params: {
    businessId: string;
  };
}

export default async function BusinessDetailedView({ params }: BusinessDetailedViewProps) {
  console.log("BusinessDetailedView params:", params);

  const { businessId } = params;

  try {
    // Fetch business details server-side
    const business: BusinessListing = await BusinessListingController.getBusinessListing(businessId);
    console.log("[BusinessDetailedView] Fetched business details:", business);


    const { addressDetails, contactDetails, specifications } = business;

    return (
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">

        <h1 className="text-2xl font-bold mb-4">{specifications.businessName}</h1>

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
              <Link href={`/business/address/add/${businessId}`} className="text-blue-600 underline">
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
              <Link href={`/business/contact-details/add/${businessId}`} className="text-blue-600 underline">
                Edit Contact Details
              </Link>
            </div>
          </div>

          {/* Business Specifications Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Business Details</h2>
            <p><strong>Days Open:</strong> {specifications.availability?.days.map(day => `${day} `)}</p>
            <p><strong>Start Time:</strong> {specifications.availability?.startTime}</p>
            <p><strong>End Time:</strong> {specifications.availability?.endTime}</p>
            <div className="mt-4 flex gap-6">
              <Link href={`/business/specifications/add/${businessId}`} className="text-blue-600 underline">
                Edit Specifications
              </Link>
            </div>
          </div>

          {/* Corrected Button Logic */}
          <div>
            <Link
              href={`/office/view-all/${businessId}`}
              className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            >
              View All Offices for this business
            </Link>
          </div>
        </div>


      </div>
    );
  } catch (error) {
    console.error("[BusinessDetailedView] Error fetching business details:", error);
    notFound();
  }
}
