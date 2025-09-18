import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-2xl font-bold border-2 border-gray-700 rounded-full px-6 py-2 text-gray-800 bg-white shadow-sm hover:bg-gray-50 transition">
          AI SAATHI
        </span>
      </div>
      {/* Section Name */}
      <div className="text-lg font-semibold text-green-900 tracking-wide">
        Flashcards
      </div>
      {/* Auth Buttons */}
      <div className="flex gap-3">
        <button
          className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition shadow"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition shadow"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
