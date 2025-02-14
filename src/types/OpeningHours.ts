import { z } from 'zod';
import { WeekDay } from './WeekDay';  // WeekDay enum
import { DateTime } from 'luxon';  // Luxon DateTime
import { LocalTime } from './LocalTime';  // LocalTime type as DateTime

// Define Zod schema for WeekDay using nativeEnum
const WeekDaySchema = z.nativeEnum(WeekDay);  // This ensures compatibility with the WeekDay enum

// Define Zod schema for LocalTime (validate time format HH:mm and convert to DateTime)
const LocalTimeSchema = z
  .string()
  .regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, "Invalid time format (must be HH:mm)")
  .transform((timeString) => DateTime.fromFormat(timeString, 'HH:mm').setZone('UTC'));  // Convert valid string to DateTime

// Define the OpeningHours schema using Zod
const OpeningHoursSchema = z.object({
  day: WeekDaySchema,
  openingTime: LocalTimeSchema,
  closingTime: LocalTimeSchema,
});

// Interface remains for static type checking
export interface OpeningHours {
  day: WeekDay;
  openingTime: LocalTime;  // LocalTime is DateTime
  closingTime: LocalTime;  // LocalTime is DateTime
}

export function deserializeOpeningHours(json: string): OpeningHours | string {
  try {
    const parsed = JSON.parse(json);

    // Zod runtime validation
    const result = OpeningHoursSchema.safeParse(parsed);
    if (!result.success) {
      return ""; // Return an empty string if data is invalid
    }

    return result.data; // Return validated data if it's valid
  } catch (error) {
    return ""; // Return an empty string if JSON is invalid or parsing fails
  }
}


// Serialize OpeningHours to JSON with Zod validation
export function serializeOpeningHours(openingHours: OpeningHours): string {
  // Convert DateTime objects to strings (HH:mm format) for serialization
  const serializedOpeningHours = {
    ...openingHours,
    openingTime: openingHours.openingTime.toFormat('HH:mm'),
    closingTime: openingHours.closingTime.toFormat('HH:mm'),
  };

  // Zod runtime validation (optional)
  const result = OpeningHoursSchema.safeParse(serializedOpeningHours);
  if (!result.success) {
    throw new Error('Invalid OpeningHours object');
  }

  return JSON.stringify(serializedOpeningHours);
}
