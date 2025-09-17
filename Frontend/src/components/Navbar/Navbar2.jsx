<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this import
>>>>>>> 0c8029bd46c74c89c922e1f81ce32960251f92d4
import "./navbar.css";
import { Menu } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar2({ onToggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

<<<<<<< HEAD
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

      {/* Centered title only when not logged in */}
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
=======
export default function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // <-- Add this line

  return (
    <header className="navbar fixed top-0 left-0 w-full z-50">
      <div className="brand">AI SAATHI</div>
      <button className="navbar-toggle-btn" onClick={() => setMenuOpen((v) => !v)}>
        {menuOpen ? "Close" : "Menu"}
      </button>
      <div className={`navbar-menu${menuOpen ? " open" : ""}`}>
        <div className="center text-2xl">Chat Anonymous</div>
        <div className="nav-actions">
          <button className="btn dark" onClick={() => navigate("/login")}>Log In</button>
          <button className="btn light">Sign Up</button>
        </div>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          <Menu size={20} />
        </button>
>>>>>>> 0c8029bd46c74c89c922e1f81ce32960251f92d4
      </div>
    </header>
  );
}