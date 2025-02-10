"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ADD LOGIC

    setMessage(`A password reset link has been sent to ${email}.`);
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm sm:max-w-md p-8 border-primary-a0/60 bg-primary-a20/5 border rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-white text-center mb-8">
          Forgot Your Password?
        </h1>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Enter Your Email Address
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 border border-primary-a10 text-white text-lg font-semibold rounded-lg hover:bg-primary-a20/20 transition duration-300 disabled:bg-primary-a40 cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-6 text-center text-lg text-white">
            <p>{message}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-white opacity-80 flex flex-col">
            Remember your password?{" "}
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
