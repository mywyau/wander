"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

interface GoogleMapProps {
  coordinates: { lat: number; lng: number }; // latitude and longitude
}

const containerStyle = {
  width: "100%",
  height: "100%", // Adjust the map height as needed
};

export default function DeskMap({ coordinates }: GoogleMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => coordinates, [coordinates]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading message while the map is loading
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15} // Adjust the zoom level as needed
    >
      {/* Add a marker to the map */}
      <Marker position={center} />
    </GoogleMap>
  );
}
