import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar({ onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-40 flex items-center justify-between bg-white shadow-sm px-6">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer mr-4"
        onClick={() => navigate("/")}
      >
        <span className="text-2xl font-bold rounded-full px-6 py-2 text-black bg-white shadow-sm hover:bg-gray-50 transition">
          AI SAATHI
        </span>
      </div>
      {/* Links */}
      <div className="flex gap-8">
        <Link to="/chat" className="text-gray-700 font-medium hover:text-blue-600 transition">Chat</Link>
        <Link to="/stories" className="text-gray-700 font-medium hover:text-blue-600 transition">Flashcard</Link>
        <Link to="/community" className="text-gray-700 font-medium hover:text-blue-600 transition">Community</Link>
      </div>
      {/* Logout Button */}
      <button
        className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition shadow text-base"
        style={{ minWidth: "90px" }}
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
}