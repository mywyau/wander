import DeskListingController from "@/controllers/desk/DeskListingController";
import { DeskListing } from "@/types/desk/DeskListing";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DeskDetailedViewProps {
  params: {
    deskId: string;
  };
}

export default async function DeskDetailedView({ params }: DeskDetailedViewProps) {
  console.log("DeskDetailedView params:", params);

  const { deskId } = params;

  try {
    // Fetch desk details server-side
    const deskListing: DeskListing = await DeskListingController.getDeskListing(deskId);
    console.log("[DeskDetailedView] Fetched desk details:", deskListing);


    const { specifications, pricing } = deskListing;

    return (
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">

        <h1 className="text-2xl font-bold mb-4">{specifications?.deskName}</h1>

        <p className="text-gray-600 mb-6">{specifications?.description}</p>

        <p className="text-gray-600 mb-6">{specifications?.rules}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Desk Specifications Section */}
          {specifications && (
            <div>
              <h2 className="text-lg font-semibold mb-2 underline">Desk Details</h2>

              {/* Desk Type */}
              {specifications.deskType && (
                <p>
                  <strong>Type of Desk:</strong> {specifications.deskType}
                </p>
              )}

              {/* Desk Features */}
              {specifications.features?.length > 0 ? (
                <p>
                  <strong>Desk Features:</strong>{" "}
                  {specifications.features.map((feature, index) => (
                    <span key={index}>
                      {feature}
                      {index < specifications.features.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : (
                <p><strong>Desk Features:</strong> Not specified</p>
              )}

              {/* Quantity */}
              {specifications.quantity && (
                <p>
                  <strong>Quantity:</strong> {specifications.quantity}
                </p>
              )}

              {/* Availability Days */}
              {specifications.availability?.days?.length > 0 ? (
                <p>
                  <strong>Days Open:</strong>{" "}
                  {specifications.availability.days.map((day, index) => (
                    <span key={index}>
                      {day}
                      {index < specifications.availability.days.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : (
                <p><strong>Days Open:</strong> Not specified</p>
              )}

              {/* Start Time */}
              {specifications.availability?.startTime && (
                <p>
                  <strong>Start Time:</strong> {specifications.availability.startTime}
                </p>
              )}

              {/* End Time */}
              {specifications.availability?.endTime && (
                <p>
                  <strong>End Time:</strong> {specifications.availability.endTime}
                </p>
              )}

              {/* Edit Link */}
              <div className="mt-4 flex gap-6">
                <Link href={`/desk-listing/specifications/update/${deskId}`} className="text-blue-600 underline">
                  Edit Specifications
                </Link>
              </div>
            </div>
          )}


          {/* Desk Pricing Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Address</h2>
            <p><strong>Price per hour:</strong> {pricing?.pricePerHour}</p>
            <p><strong>Price per day:</strong> {pricing?.pricePerDay}</p>
            <p><strong>Price per week:</strong> {pricing?.pricePerWeek}</p>
            <p><strong>Price per month:</strong> {pricing?.pricePerMonth}</p>
            <p><strong>Price per year:</strong> {pricing?.pricePerYear}</p>

            <div className="mt-4 flex gap-6">
              <Link href={`/desk-listing/pricing/update/${deskId}`} className="text-blue-600 underline">
                Edit Pricing Details
              </Link>
            </div>
          </div>
        </div>


      </div>
    );
  } catch (error) {
    console.error("[DeskDetailedView] Error fetching desk details:", error);
    notFound();
  }
}
