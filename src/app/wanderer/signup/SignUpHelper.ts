export default class SignUpHelper {
    /**
     * Generates a unique user ID based on the username and the current timestamp.
     * @param username - The user's chosen username.
     * @returns A unique user ID string.
     */
    static generateUserId(username: string): string {
      return username.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    }
  
    /**
     * Generates a timestamp in ISO format (yyyy-MM-ddTHH:mm:ss).
     * @returns A string representation of the current timestamp.
     */
    static generateTimestamp(): string {
      return new Date().toISOString().slice(0, 19);
    }
  }
  