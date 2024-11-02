"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BusinessSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user"); // default to user role
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !name) {
      setError("Please fill in all required fields.");
      return;
    }

    // try {
      
    //   // Call an API route to handle the signup logic
    //   const res = await fetch("/api/business/signup", {
    //     method: "POST",
    //     body: JSON.stringify({ email, password, name, role }), // Include role
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (res.ok) {
    //     // Automatically log in the user after signup
    //     const signInResult = await signIn("credentials", { redirect: false, email, password });

    //     if (signInResult && !signInResult.error) {
    //       router.push("/dashboard"); // Redirect to dashboard after successful login
    //     } else {
    //       router.push("/api/auth/signin"); // Redirect to login page if sign-in fails
    //     }
    //   } else {
    //     // Capture error message from the server
    //     const errorData = await res.json();
    //     setError(errorData.message || "Signup failed");
    //   }
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   setError("An error occurred during signup. Please try again.");
    // }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Business Signup</h1>
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
        
        {/* Role selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded"
        >
          <option value="business">Business</option>
        </select>

        {/* Display error message if any */}
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
