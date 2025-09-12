import React, { useState } from "react";
import "./navbar.css";
import { Menu } from "lucide-react";

export default function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="navbar fixed top-0 left-0 w-full z-50">
      <div className="brand">AI SAATHI</div>
      <button className="navbar-toggle-btn" onClick={() => setMenuOpen((v) => !v)}>
        {menuOpen ? "Close" : "Menu"}
      </button>
      <div className={`navbar-menu${menuOpen ? " open" : ""}`}>
        <div className="center text-2xl">Chat Anonymous</div>
        <div className="nav-actions">
          <button className="btn dark">Log In</button>
          <button className="btn light">Sign Up</button>
        </div>
          <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
          <Menu size={20} />
          </button>
      </div>
    </header>
  );
}