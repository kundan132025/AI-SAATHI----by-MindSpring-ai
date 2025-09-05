import React, { useState } from "react";
import "./navbar.css";

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
      </div>
    </header>
  );
}