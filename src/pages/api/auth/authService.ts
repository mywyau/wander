import AppConfig from "@/config/AppConfig";

export interface UserAuthPayload {
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export class AuthService {
  /**
   * Authenticate the user with the Scala backend.
   * @param credentials - The user's credentials (username and password).
   * @returns The authenticated user data.
   * @throws Error if authentication fails.
   */
  static async authenticate(credentials: UserAuthPayload): Promise<AuthenticatedUser> {
    console.log("Authenticating user with Scala backend:", credentials);

    if (!credentials.username || !credentials.password) {
      console.error("Username or password is missing.");
      throw new Error("Missing credentials");
    }

    try {
      const response = await fetch(`http://${AppConfig.baseUrl}/cashew/login`, {   // for docker app needs to be cashew:8080
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      console.log("Scala backend response status:", response.status);

      if (!response.ok) {
        console.error("Invalid credentials from Scala backend.");
        throw new Error("Invalid credentials");
      }

      const user: AuthenticatedUser = await response.json();
      console.log("User authenticated successfully from Scala backend:", user);

      return user;
    } catch (error) {
      console.error("Error during Scala backend authentication:", error);
      throw new Error("An error occurred during Scala backend authentication.");
    }
  }
}
