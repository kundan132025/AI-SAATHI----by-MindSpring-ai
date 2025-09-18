import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
// import your AuthContext if you have one
// import { AuthContext } from "../context/AuthContext";

export default function NavbarF() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Example: get user from context or localStorage
  // const { user, logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // If you use context: logout();
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-3 bg-white shadow-sm relative">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-2xl font-bold border-2 border-gray-700 rounded-full px-6 py-2 text-gray-800 bg-white shadow-sm hover:bg-gray-50 transition">
          AI SAATHI
        </span>
      </div>
      {/* Nav Links - Desktop */}
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/" className="text-gray-700 font-medium hover:text-blue-600 transition">Home</Link>
        <Link to="/chat" className="text-gray-700 font-medium hover:text-blue-600 transition">Chat</Link>
        <Link to="/dashboard" className="text-gray-700 font-medium hover:text-blue-600 transition">Dashboard</Link>
      </div>
      {/* Auth Buttons - Desktop */}
      <div className="hidden md:flex gap-3">
        {user ? (
          <button
            className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition shadow"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
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
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 z-50 md:hidden">
          <Link
            to="/"
            className="py-2 text-gray-700 font-medium hover:text-blue-600 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/chat"
            className="py-2 text-gray-700 font-medium hover:text-blue-600 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Chat
          </Link>
          <Link
            to="/dashboard"
            className="py-2 text-gray-700 font-medium hover:text-blue-600 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          {user ? (
            <button
              className="w-4/5 my-2 px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition shadow"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
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
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
