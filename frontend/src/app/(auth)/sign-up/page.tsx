"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement logic
    console.log("Signing up with", { email, password });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm sm:max-w-md p-8 border-primary-a0/60 bg-primary-a20/5 border rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-white text-center mb-8">
          Create an Account
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-tonal-a10/40 border border-primary-a10/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-a10"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-tonal-a10/40 border border-primary-a10/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-a10"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-tonal-a10/40 border border-primary-a10/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-a10"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 border border-primary-a10 text-white text-lg font-semibold rounded-lg hover:bg-primary-a20/20 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-white opacity-80 flex flex-col">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-a40 underline hover:text-primary-a20 transition duration-200"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
