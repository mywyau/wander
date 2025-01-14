import { GoogleMap, Marker } from "@react-google-maps/api";
const MapContainer = (
    {
        latitude,
        longitude,
    }: {
        latitude?: number;
        longitude?: number;
    }) => (
    <div className="mt-4 lg:mt-0 lg:w-1/2 h-96">
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={latitude && longitude ? 14 : 4}
            center={
                latitude && longitude
                    ? { lat: latitude, lng: longitude }
                    : { lat: 39.8283, lng: -98.5795 } // Default center (USA)	
            }
        >
            {latitude && longitude && (
                <Marker position={{ lat: latitude, lng: longitude }} />
            )}
        </GoogleMap>
    </div>
);

export default MapContainer;