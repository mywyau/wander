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


    const { specifications,  pricingDetails } = deskListing;

    return (
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">

        <h1 className="text-2xl font-bold mb-4">{deskListing.deskName}</h1>

        <p className="text-gray-600 mb-6">{deskListing.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Desk Specifications Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Desk Details</h2>
            <p><strong>Days Open:</strong> {specifications?.availability?.days.map(day => `${day} `)}</p>
            <p><strong>Start Time:</strong> {specifications?.availability?.startTime}</p>
            <p><strong>End Time:</strong> {specifications?.availability?.endTime}</p>
            <div className="mt-4 flex gap-6">
              <Link href={`/desk/specifications/add/${deskId}`} className="text-blue-600 underline">
                Edit Specifications
              </Link>
            </div>
          </div>

          {/* Desk Pricing Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 underline">Address</h2>
            <p><strong>Price per hour:</strong> {pricingDetails?.pricePerHour}</p>
            <p><strong>Price per day:</strong> {pricingDetails?.pricePerDay}</p>
            <p><strong>Price per week:</strong> {pricingDetails?.pricePerWeek}</p>
            <p><strong>Price per month:</strong> {pricingDetails?.pricePerMonth}</p>
            <p><strong>Price per year:</strong> {pricingDetails?.pricePerYear}</p>

            <div className="mt-4 flex gap-6">
              <Link href={`/desk/address/add/${deskId}`} className="text-blue-600 underline">
                Edit Pricing Details
              </Link>
            </div>
          </div>

          {/* Corrected Button Logic */}
          <div>
            <Link
              href={`/desk/office/view-all/${deskId}`}
              className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600"
            >
              View All Offices for this desk
            </Link>
          </div>


        </div>


      </div>
    );
  } catch (error) {
    console.error("[DeskDetailedView] Error fetching desk details:", error);
    notFound();
  }
}
