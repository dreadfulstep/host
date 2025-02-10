"use client"

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-primary-a40">404</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for does not exist.</p>
        <Link
          href="/"
          className="bg-primary-a10 hover:bg-primary-a20 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
