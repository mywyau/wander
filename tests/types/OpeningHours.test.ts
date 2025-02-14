import { deserializeOpeningHours, isDeserializationError, OpeningHours, serializeOpeningHours } from '@/types/OpeningHours';
import { WeekDay } from '@/types/WeekDay';
import { DateTime } from 'luxon';

describe('OpeningHours serialization and deserialization', () => {

    it('should serialize and deserialize OpeningHours correctly', () => {
        // Example OpeningHours object
        const originalOpeningHours: OpeningHours = {
            day: WeekDay.Monday,
            openingTime: DateTime.fromObject({ hour: 9, minute: 0 }),
            closingTime: DateTime.fromObject({ hour: 17, minute: 0 }),
        };

        // Serialize to JSON
        const json = serializeOpeningHours(originalOpeningHours);
        expect(json).toBe('{"day":"Monday","openingTime":"09:00","closingTime":"17:00"}');

        // Deserialize back to an OpeningHours object
        const deserializedOpeningHours = deserializeOpeningHours(json);

        // Type guard to check if it's an error object
        if (isDeserializationError(deserializedOpeningHours)) {
            expect(deserializedOpeningHours).toEqual({ error: true, message: 'Invalid OpeningHours data' });
        } else {
            expect(deserializedOpeningHours.day).toBe("Monday");
            expect(deserializedOpeningHours.openingTime.toFormat('HH:mm')).toBe('09:00');
            expect(deserializedOpeningHours.closingTime.toFormat('HH:mm')).toBe('17:00');
        }
    });

    it('should handle invalid JSON gracefully', () => {
        const invalidJson = '{"day":"Monday","openingTime":"invalid","closingTime":"17:00"}';

        // Expect that invalid JSON returns an error object with a detailed error message
        const result = deserializeOpeningHours(invalidJson);
        expect(result).toEqual({ error: true, message: 'Invalid OpeningHours data' });
    });


    it('should handle edge case of midnight times correctly', () => {

        const midnightOpeningHours: OpeningHours = {
            day: WeekDay.Sunday,
            openingTime: DateTime.fromObject({ hour: 0, minute: 0 }),
            closingTime: DateTime.fromObject({ hour: 0, minute: 30 }),
        };

        const json = serializeOpeningHours(midnightOpeningHours);
        expect(json).toBe('{"day":"Sunday","openingTime":"00:00","closingTime":"00:30"}');

        const deserialized = deserializeOpeningHours(json);

        if (isDeserializationError(deserialized)) {
            expect(deserialized).toEqual({ error: true, message: 'Invalid OpeningHours data' });
        } else {
            expect(deserialized.day).toBe("Sunday");
            expect(deserialized.openingTime.toFormat('HH:mm')).toBe('00:00');
            expect(deserialized.closingTime.toFormat('HH:mm')).toBe('00:30');
        }
    });
});
