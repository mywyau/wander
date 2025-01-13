import { sanitizeString } from "@/forms/FormSanitationUtil";


describe('sanitizeString', () => {
    it('should trim leading and trailing spaces', () => {
        expect(sanitizeString('   Hello World   ')).toBe('Hello World');
    });

    it('should remove <script> tags for XSS protection', () => {
        const input = '<script>alert("XSS Attack")</script>hello';
        const expectedOutput = 'hello';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should remove < and > characters to prevent HTML injection', () => {
        const input = '<div>Hello</div>';
        const expectedOutput = 'divHello/div';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should replace & with &amp;', () => {
        const input = 'Hello & Goodbye';
        const expectedOutput = 'Hello &amp; Goodbye';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should replace single quotes with &#39;', () => {
        const input = "It's a beautiful day";
        const expectedOutput = "It&#39;s a beautiful day";
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should replace double quotes with &quot;', () => {
        const input = 'He said, "Hello!"';
        const expectedOutput = 'He said, &quot;Hello!&quot;';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should return the input as is if it is not a string', () => {
        expect(sanitizeString(123)).toBe(123); // Should return number as it is
        expect(sanitizeString(null)).toBe(null); // Should return null as it is
        expect(sanitizeString(undefined)).toBe(undefined); // Should return undefined as it is
    });

    it('should return an empty string when input is an empty string', () => {
        expect(sanitizeString('')).toBe('');
    });

    it('should handle input with mixed cases for <script> tag sanitization', () => {
        const input = '<Script>alert("XSS")</Script>';
        const expectedOutput = '';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should handle input with no special characters', () => {
        const input = 'Just a normal string';
        expect(sanitizeString(input)).toBe('Just a normal string');
    });
});
