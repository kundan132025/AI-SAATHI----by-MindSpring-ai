import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { Menu } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar2({ onToggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="navbar fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-white shadow">
      <div className="flex items-center">
        {/* Toggle button */}
        <button
          onClick={onToggleSidebar}
          className="mr-3 p-2 focus:outline-none rounded-lg bg-gray-200 hover:bg-gray-300 border-none"
        >
          <Menu size={22} />
        </button>
        <div className="brand text-xl font-bold">AI SAATHI</div>
      </div>

      {/* Centered title only when user is logged in */}
      {!user && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          Chat Anonymous
        </div>
      )}

      <div className="flex items-center gap-2">
        {!user && (
          <>
            <button className="btn dark focus:outline-none" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="btn light focus:outline-none" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </>
        )}
        {user && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="btn dark focus:outline-none"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

<nav className="nav-links flex gap-8 ml-8">
  <Link to="/chat" className="nav-link text-gray-700 font-medium hover:text-blue-600 transition">Chat</Link>
  <Link to="/stories" className="nav-link text-gray-700 font-medium hover:text-blue-600 transition">Flashcard</Link>
  <Link to="/community" className="nav-link text-gray-700 font-medium hover:text-blue-600 transition">Community</Link>
</nav>