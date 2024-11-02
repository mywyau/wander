import { useState } from "react";

const hours = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minutes}`;
});

export default function TimeGrid() {
  const [startSlot, setStartSlot] = useState<number | null>(null);
  const [endSlot, setEndSlot] = useState<number | null>(null);

  const handleSlotClick = (index: number) => {
    if (startSlot === null) {
      setStartSlot(index); // Set the start time
      setEndSlot(null);    // Clear end time to start a new selection
    } else if (endSlot === null && index >= startSlot) {
      // If the end slot is not selected yet, set it when clicked
      setEndSlot(index);
    } else {
      // Reset selection when clicking after both start and end slots are selected
      setStartSlot(index);
      setEndSlot(null);
    }
  };

  // Calculate the time difference in hours and minutes
  const calculateTimeDifference = () => {
    if (startSlot === null || endSlot === null) return null;

    const totalMinutesStart = startSlot * 30; // Each slot is 30 minutes
    const totalMinutesEnd = endSlot * 30;
    const differenceInMinutes = totalMinutesEnd - totalMinutesStart;

    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    return { hours, minutes };
  };

  const timeDifference = calculateTimeDifference();


  // Determines if a slot is part of the selected range or is the start/end slot
  const isSlotSelected = (index: number) => {
    if (startSlot === null) return false;
    if (endSlot === null) return index === startSlot; // Highlight only start slot if end slot isn't set
    return index >= startSlot && index <= endSlot; // Highlight the full range between start and end
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Select Time Range</h2>

      {/* Flex container for side-by-side layout */}
      <div className="flex space-x-8">

        {/* Time Slots Grid */}
        <div className="grid grid-cols-1 gap-2 w-1/2 max-w-xs">
          {hours.map((hour, index) => (
            <div
              key={index}
              onClick={() => handleSlotClick(index)}
              className={`p-2 border ${isSlotSelected(index) ? "bg-indigo-500 text-white" : "bg-gray-100"
                } cursor-pointer rounded-lg text-center text-sm`}
            >
              {hour}
            </div>
          ))}
        </div>

        {/* Show the selected start and end time */}
        <div className="w-1/2">
          {startSlot !== null && (
            <p className="text-lg mb-4">
              <strong>Start Time:</strong> {hours[startSlot]}
            </p>
          )}
          {endSlot !== null && (
            <p className="text-lg mb-4">
              <strong>End Time:</strong> {hours[endSlot]}
            </p>
          )}
          {startSlot !== null && endSlot !== null && (
            <p className="text-lg mt-2">
              <strong>Selected Time Range:</strong> {hours[startSlot]} to {hours[endSlot]}
            </p>
          )}

          {/* Display the calculated time difference */}
          {timeDifference && (
            <p className="text-lg mt-4">
              <strong>Duration:</strong> {timeDifference.hours} hour(s) and {timeDifference.minutes} minute(s)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
