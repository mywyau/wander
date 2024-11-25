import { UserSignupRequest } from "@/types/registration/UserSignupRequest";
import AppConfig from "../../../../config/AppConfig"; // Adjust the path as needed

export interface SignUpResponse {
  success: boolean;
  errorData?: {
    emailErrors?: string[];
    passwordErrors?: string[];
    usernameErrors?: string[];
    message?: string;
  };
}

export default class SignUpConnector {
  /**
   * Sends a signup request to the backend.
   * @param payload - The signup request payload.
   * @returns A response indicating success or error details.
   */
  static async register(payload: UserSignupRequest): Promise<SignUpResponse> {
    try {
      const res = await fetch(`http://${AppConfig.baseUrl}/cashew/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, errorData };
      }
    } catch (error) {
      console.error("Error during signup:", error);
      throw new Error("Network error during signup");
    }
  }
}
