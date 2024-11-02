"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BusinessLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Use next-auth signIn function with "credentials" provider for business login
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result && !result.error) {
        // Redirect to business dashboard on successful login
        router.push("/business/dashboard");
      } else {
        // Handle login errors
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Business Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="email"
          placeholder="Business Email"
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
          Log In as Business
        </button>
      </form>
      <p className="mt-4">
        Don't have a business account?{" "}
        <a href="/signup/business" className="text-green-500 hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  );
}
