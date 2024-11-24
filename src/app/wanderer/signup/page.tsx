"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Wanderer"); // Default user role
  const [error, setError] = useState<string>("");

  // Individual error states for each field
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]); // Array for multiple password errors
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Show password toggle

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !username) {
      setError("Please fill in all required fields.");
      return;
    }

    const userId = username.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    const createdAt = new Date().toISOString().slice(0, 19);
    const updatedAt = new Date().toISOString().slice(0, 19);

    try {
      // Clear previous field-specific errors
      setEmailError(null);
      setPasswordErrors([]); // Clear previous password errors
      setUsernameError(null);

      // Call the backend API to handle signup
      const res = await fetch("http://cashew-app:8080/cashew/register", {
        method: "POST",
        body: JSON.stringify({
          userId,
          username,
          password,
          email,
          role,
          createdAt,
          updatedAt
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/wanderer/home"); // Redirect on success
      } else {
        const errorData = await res.json();
        console.error("Signup failed:", errorData);

        // Set field-specific error messages if available
        setEmailError(errorData.emailErrors?.[0] || null);
        setPasswordErrors(errorData.passwordErrors || []); // Set all password errors
        setUsernameError(errorData.usernameErrors?.[0] || null);

        // Set a generic error message if there’s no specific field error
        setError(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Wanderer Signup</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded pr-10" // Added padding on the right for the icon
            required
          />
          {passwordErrors.length > 0 && (
            <div className="text-red-500 text-sm space-y-1">
              {passwordErrors.map((error, index) => (
                <p key={index}>{error}</p> // Display each password error
              ))}
            </div>
          )}
          {/* Eye icon for toggling password visibility */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.686 2.457-2.712 4.554-5.237 5.611m-1.458-1.362a9.959 9.959 0 01-3.347.751C7.523 19 3.732 16.057 2.458 12z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825a9.96 9.96 0 01-1.875.175C7.522 19 3.732 16.057 2.458 12 3.732 7.943 7.523 5 12 5c1.36 0 2.664.25 3.875.825M19.21 8.94a9.9 9.9 0 012.332 3.06M9.88 12.12l-2.12-2.12M12 12l2.12 2.12M15 12h-.01"
                />
              </svg>
            )}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
