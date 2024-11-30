"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserSignupRequest } from "../../../types/registration/UserSignupRequest";
import InputWithError from "./components/InputWithError";
import PasswordInputField from "./components/PasswordInputField";
import SignUpConnector from "./connector/SignUpConnector";
import SignUpHelper from "./SignUpHelper";

export default function WandererSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Wanderer");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload: UserSignupRequest = {
      userId: SignUpHelper.generateUserId(username),
      username,
      password,
      email,
      role,
      createdAt: SignUpHelper.generateTimestamp(),
      updatedAt: SignUpHelper.generateTimestamp(),
    };

    try {
      const response = await SignUpConnector.register(payload);

      if (response.success) {
        router.push("/wanderer/home");
      } else if (response.errorData) {
        setEmailError(response.errorData.emailErrors?.[0] || null);
        setPasswordErrors(response.errorData.passwordErrors || []);
        setUsernameError(response.errorData.usernameErrors?.[0] || null);
        setError(response.errorData.message || "Signup failed");
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
        <InputWithError
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
          required
        />
        <InputWithError
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          required
        />
        <PasswordInputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errors={passwordErrors}
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
