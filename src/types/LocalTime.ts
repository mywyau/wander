import { DateTime } from 'luxon';

export type LocalTime = DateTime;

// Utility function to create LocalTime from "HH:mm"
function createLocalTime(hour: number, minute: number): LocalTime {
  return DateTime.fromObject({ hour, minute }).setZone('UTC');
}


export function toStringFormat(localTime: LocalTime): string {
  return localTime.setZone('UTC').toFormat('HH:mm');
}

