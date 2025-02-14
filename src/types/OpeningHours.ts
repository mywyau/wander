import { DateTime } from "luxon";
import { LocalTime } from "./LocalTime";


export interface OpeningHours {
  day: WeekDay;
  openingTime: LocalTime;
  closingTime: LocalTime;
}

// Function to serialize OpeningHours to JSON
export function serializeOpeningHours(openingHours: OpeningHours): string {
  return JSON.stringify({
    day: openingHours.day,
    openingTime: openingHours.openingTime.toFormat('HH:mm'), // Format time to HH:mm
    closingTime: openingHours.closingTime.toFormat('HH:mm'),     // Format time to HH:mm
  });
}

// Function to deserialize JSON string into OpeningHours
export function deserializeOpeningHours(json: string): OpeningHours {
  const parsed = JSON.parse(json);
  return {
    day: parsed.day,
    openingTime: DateTime.fromFormat(parsed.openingTime, 'HH:mm').setZone('UTC'),
    closingTime: DateTime.fromFormat(parsed.closingTime, 'HH:mm').setZone('UTC'),
  };
}
