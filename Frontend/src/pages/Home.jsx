import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import FloatingBubbles from "../components/FloatingBubbles/FloatingBubbles";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] w-full relative">
        <FloatingBubbles />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              OUR GOAL IS
            </h3>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8">
              YOUTH MENTAL WELLNESS
            </h1>
            <button className="chat-btn"
              onClick={() => navigate("/chat")}
            >CHAT</button>
          </div>
        </div>
      </main>
    </div>
  );
}
