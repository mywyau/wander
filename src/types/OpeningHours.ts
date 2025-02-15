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
  openingTime: LocalTime;  // LocalTime is DateTime
  closingTime: LocalTime;  // LocalTime is DateTime
}

// export interface OpeningHours {
//   openingTime: string;  // LocalTime is DateTime
//   closingTime: string;  // LocalTime is DateTime
// }

type DeserializationError = {
  error: boolean;
  message: string;
};

// TypeScript type guard to check if the result is a DeserializationError
export function isDeserializationError(result: any): result is DeserializationError {
  return result && result.error === true;
}

// export function deserializeOpeningHours(json: string): OpeningHours | DeserializationError {
//   try {
//     const parsed = JSON.parse(json);

//     // Zod runtime validation
//     const result = OpeningHoursSchema.safeParse(parsed);
//     if (!result.success) {
//       return { error: true, message: 'Invalid OpeningHours data' };
//     }

//     return result.data; // Return validated data if it's valid
//   } catch (error) {
//     return { error: true, message: 'Invalid JSON format' }; // Return a detailed error message
//   }
// }

// Serialize OpeningHours to JSON with Zod validation
// export function serializeOpeningHours(openingHours: OpeningHours): string {
//   // Convert DateTime objects to strings (HH:mm format) for serialization
//   const serializedOpeningHours = {
//     ...openingHours,
//     openingTime: openingHours.openingTime.toFormat('HH:mm'),
//     closingTime: openingHours.closingTime.toFormat('HH:mm'),
//   };

//   // Zod runtime validation (optional)
//   const result = OpeningHoursSchema.safeParse(serializedOpeningHours);
//   if (!result.success) {
//     throw new Error('Invalid OpeningHours object');
//   }

//   return JSON.stringify(serializedOpeningHours);
// }
