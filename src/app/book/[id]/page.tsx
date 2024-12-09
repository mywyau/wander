import DeskMap from "@/components/GoogleMaps";
import BookingForm from "../../../components/BookingForm";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function BookDeskPage({ params }: { params: { id: string } }) {
  const getCoordinates: Coordinates = {
    lat: 51.5074,
    lng: -0.1276,
  };

  const deskId = parseInt(params.id, 10);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Section: Booking Form */}
      <div className="lg:w-2/5 w-full bg-gray-100 p-2 shadow-lg flex items-center justify-center">
        <div className="max-w-lg w-full p-4 sm:p-6 lg:p-8">
          <BookingForm deskId={deskId} />
        </div>
      </div>

      {/* Right Section: Map */}
      <div className="lg:w-3/5 w-full bg-gray-200 p-6 flex items-center justify-center">
        <div className="w-full h-[800px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px] rounded-md overflow-hidden shadow-lg">
          <DeskMap coordinates={getCoordinates} />
        </div>
      </div>
    </main>
  );
}
