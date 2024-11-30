"use client";

import AppConfig from "@/config/AppConfig";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessSignup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // default to empty email
  const [role, setRole] = useState("Business"); // Default user role
  const [error, setError] = useState<String>("");  // default error to empty string message
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !username) {
      setError("Please fill in all required fields.");
      return;
    }

    const userId = username.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now(); // Example userId based on name and timestamp
    const createdAt = new Date().toISOString().slice(0, 19); // Generates ISO 8601 format without milliseconds
    const updatedAt = new Date().toISOString().slice(0, 19); // Generates ISO 8601 format without milliseconds

    // Log request details
    console.log("Submitting signup request to backend:");
    console.log("Endpoint:", `http://${AppConfig.baseUrl}//cashew/register`);
    console.log("Payload:", {
      userId,
      username: username,
      password,
      email,
      role,
      createdAt,
      updatedAt
    });

    try {
      // Call the backend API to handle signup
      const res = await fetch(`http://${AppConfig.baseUrl}//cashew/register`, {
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

      // Log the response status
      console.log("Response Status:", res.status);

      if (res.ok) {
        // Log success message
        console.log("User successfully created. Logging in...");

        // // Automatically log in the user after signup
        // const signInResult = await signIn("credentials", { redirect: false, email, password });

        // if (signInResult && !signInResult.error) {
        //   router.push("/wanderer/home"); // Redirect to dashboard after successful login
        // } else {
        //   router.push("/wanderer/home"); // Redirect to login page if sign-in fails
        // }
        
        router.push("/business/home"); // Redirect to dashboard after successful login
      } else {
        // Capture and log error message from the server
        const errorData = await res.json();
        console.error("Signup failed:", errorData);
        setError(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Business Signup</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        {/* Display error message if any */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
