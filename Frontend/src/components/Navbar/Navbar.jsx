import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-20 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-white shadow-sm">
      {/* Brand */}
      <div
        className="cursor-pointer text-2xl font-bold border-2 border-gray-700 rounded-full px-6 py-2 text-gray-800 bg-white shadow-sm hover:bg-gray-50 transition"
        onClick={() => navigate("/")}
      >
        AI SAATHI
      </div>
      {/* Desktop Nav */}
      <nav className="hidden md:flex flex-row gap-8 items-center">
        <Link
          to="/dashboard"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/stories"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Flashcard
        </Link>
        <Link
          to="/community"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Community
        </Link>
        <button
          className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition shadow ml-4"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition shadow"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </nav>
      {/* Mobile Toggle */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded border border-gray-300 bg-white hover:bg-gray-100 z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        {menuOpen ? (
          <HiX className="w-8 h-8 text-gray-800" />
        ) : (
          <HiMenu className="w-8 h-8 text-gray-800" />
        )}
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 z-50 md:hidden">
          <Link
            to="/dashboard"
            className="py-2 text-gray-700 font-medium hover:text-blue-600 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/stories"
            className="py-2 text-gray-700 font-medium hover:text-blue-600 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Flashcard
          </Link>
          <Link
            to="/community"
            className="py-2 text-gray-700 font-medium hover:text-blue-600 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Community
          </Link>
          <button
            className="w-4/5 my-2 px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition shadow"
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            Log In
          </button>
          <button
            className="w-4/5 px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition shadow"
            onClick={() => {
              setMenuOpen(false);
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}
