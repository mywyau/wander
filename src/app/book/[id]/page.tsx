import DeskMap from "@/components/GoogleMaps";
import BookingForm from "../../../components/BookingForm";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function BookDeskPage({ params }: { params: { id: string } }) {
  const getCoordinates: Coordinates = {
    lat: 51.5074,
    lng: -0.1276
  };

  const deskId = parseInt(params.id, 10);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        {/* Flexbox container for the form and map side by side */}
        <div className="flex flex-col md:flex-row w-full md:space-x-8">
          
          {/* Booking Form on the left side */}
          <div className="md:w-1/2 w-full mb-6 md:mb-0">
            <BookingForm deskId={deskId} />
          </div>

          {/* DeskMap on the right side taking up the entire right half */}
          <div className="flex-grow bg-white p-6 rounded-md shadow-lg md:h-auto">
            <DeskMap coordinates={getCoordinates} />
          </div>
        </div>
      </div>
    </main>
  );
}
