"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BusinessSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Wanderer"); // Default user role
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !name) {
      setError("Please fill in all required fields.");
      return;
    }

    const user_id = name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now(); // Example userId based on name and timestamp
    const created_at = new Date().toISOString().slice(0, 19); // Generates ISO 8601 format without milliseconds

    // Log request details
    console.log("Submitting signup request to backend:");
    console.log("Endpoint:", "http://localhost:8080/cashew/register");
    console.log("Payload:", {
      user_id,
      username: name,
      password,
      email,
      role,
      created_at,
    });

    try {
      // Call the backend API to handle signup
      const res = await fetch("http://localhost:8080/cashew/register", {
        method: "POST",
        body: JSON.stringify({
          user_id,
          username: name,
          password,
          email,
          role,
          created_at,
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
        
        router.push("/wanderer/home"); // Redirect to dashboard after successful login
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
      <h1 className="text-3xl font-bold mb-6">Wanderer Signup</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
