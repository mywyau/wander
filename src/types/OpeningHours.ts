import { z } from 'zod';
import { WeekDay } from './WeekDay';  // WeekDay enum
import { DateTime } from 'luxon';  // Luxon DateTime
import { LocalTime } from './LocalTime';  // LocalTime type as DateTime

const WeekDaySchema = z.nativeEnum(WeekDay);  // This ensures compatibility with the WeekDay enum

const LocalTimeSchema = z
  .string()
  .regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, "Invalid time format (must be HH:mm)")
  .transform((timeString) => DateTime.fromFormat(timeString, 'HH:mm').setZone('UTC'));  // Convert valid string to DateTime

const OpeningHoursSchema = z.object({
  day: WeekDaySchema,
  openingTime: LocalTimeSchema,
  closingTime: LocalTimeSchema,
});

export interface OpeningHours {
  openingTime: LocalTime;
  closingTime: LocalTime;
}

type DeserializationError = {
  error: boolean;
  message: string;
};

export function isDeserializationError(result: any): result is DeserializationError {
  return result && result.error === true;
}