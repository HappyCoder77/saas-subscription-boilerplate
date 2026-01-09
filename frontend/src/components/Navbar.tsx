"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  // Don't show the navbar if it's still loading the session
  if (loading) return null;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">SaaS App</Link>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* Show user email and logout button if authenticated */}
            <span className="text-sm text-gray-600">
              Logged in as:{" "}
              <strong className="text-gray-900">{user.email}</strong>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show login/register if not authenticated */}
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
