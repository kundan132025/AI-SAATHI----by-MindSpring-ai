// export default function Navbar() {
//   return (
//     <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 shadow-md rounded-lg mx-4 mt-4">
//       {/* Logo */}
//       <div className="px-4 py-2 bg-white rounded-full shadow-md font-semibold text-gray-800">
//         AI SAATHI
//       </div>

//       {/* Auth Buttons */}
//       <div className="flex gap-3">
//         <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition">
//           Log In
//         </button>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
//           Sign Up
//         </button>
//       </div>
//     </nav>
//   )
// }
// // 
import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="navbar fixed top-0 left-0 w-full z-50">
      <div className="brand">AI SAATHI</div>
      <div className="nav-actions">
        <button className="btn dark">Log In</button>
        <button className="btn light">Sign Up</button>
      </div>
    </header>
  );
}
