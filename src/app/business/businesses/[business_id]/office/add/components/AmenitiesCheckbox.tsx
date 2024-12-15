import React from "react";

interface AmenitiesProps {
  amenities: string[]; // List of available amenities
  selectedAmenities: string[]; // Currently selected amenities
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities, selectedAmenities, onChange }) => {

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700">Amenities</legend>
      <div className="flex gap-4 mt-2">
        {amenities.map((amenity) => (
          <label key={amenity} className="flex items-center">
            <input
              type="checkbox"
              value={amenity}
              checked={selectedAmenities.includes(amenity)}
              onChange={onChange}
              className="mr-2"
            />
            {amenity}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default Amenities;
