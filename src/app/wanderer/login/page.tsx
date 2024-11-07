"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Attempting to submit login form...");

    if (!username || !password) {
      console.log("Validation failed: Missing username or password.");
      setError("Please enter both username and password.");
      return;
    }

    console.log("Form data:", { username, password });

    try {
      console.log("Sending signIn request with credentials...");
      const result = await signIn("credentials", {
        redirect: false,
        username, // Using "username" here for Scala backend
        password,
      });

      console.log("SignIn result:", result);

      if (result && !result.error) {
        console.log("Sign-in successful, redirecting to /wanderer/home...");
        router.push("/wanderer/home");
      } else {
        console.warn("Sign-in failed:", result?.error);
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  const handleProviderSignIn = async (provider: string) => {
    console.log(`Attempting to sign in with ${provider}...`);

    try {
      await signIn(provider, { callbackUrl: "/" });
      console.log(`${provider} sign-in successful.`);
    } catch (error) {
      console.error(`Sign-in error with ${provider}:`, error);
      setError(`An error occurred with ${provider} sign-in. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
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
          Log In
        </button>
      </form>

      {/* Sign in with Social Providers */}
      <div className="mt-6 w-full max-w-md space-y-4">
        <button
          onClick={() => handleProviderSignIn("google")}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => handleProviderSignIn("github")}
          className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-900 transition-colors"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => handleProviderSignIn("facebook")}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Sign in with Facebook
        </button>
        <button
          onClick={() => handleProviderSignIn("twitter")}
          className="w-full bg-blue-400 text-white py-3 rounded hover:bg-blue-500 transition-colors"
        >
          Sign in with Twitter
        </button>
      </div>

      <p className="mt-4">
        Don't have an account?{" "}
        <a href="/wanderer/signup" className="text-blue-500 hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  );
}
