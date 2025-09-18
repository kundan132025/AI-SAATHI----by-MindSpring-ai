import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import FloatingBubbles from "../components/FloatingBubbles/FloatingBubbles";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-blue-100 to-purple-100">
      <Navbar />
      <main className="min-h-screen w-full relative flex flex-col items-center justify-center">
        <FloatingBubbles />
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-2 sm:px-4 md:px-8">
          <div className="text-center w-full px-2 sm:px-6 lg:px-8 mt-12">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              OUR GOAL IS
            </h3>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 animate-scale-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              YOUTH MENTAL WELLNESS
            </h1>
            <p className="max-w-xl mx-auto text-center text-base sm:text-lg text-gray-600 mb-10">
              <Typewriter
                words={[
                  "Welcome to AI Saathi, your companion for mental wellness.",
                ]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={1500}
              />
            </p>
            <button
              className="px-8 py-3 rounded-lg bg-blue-400 text-white font-bold text-lg shadow hover:bg-blue-500 hover:scale-105 transition-transform duration-200"
              onClick={() => navigate("/chat")}
            >
              Start Chat
            </button>
            <div className="flex flex-wrap justify-center gap-6 mb-8 mt-8 w-full">
              <div className="bg-white bg-opacity-70 rounded-xl shadow p-6 w-full sm:w-80 md:w-96 min-w-[16rem] min-h-[240px] text-center flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-opacity-90">
                <h3 className="font-bold text-xl mb-2 text-blue-700">
                  AI Chat Support
                </h3>
                <p className="text-gray-600">
                  Talk to our AI for instant, confidential support and guidance
                  anytime you need it.
                </p>
              </div>
              <div className="bg-white bg-opacity-70 rounded-xl shadow p-6 w-full sm:w-80 md:w-96 min-w-[16rem] min-h-[240px] text-center flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-opacity-90">
                <h3 className="font-bold text-xl mb-2 text-green-700">
                  Flashcard Stories
                </h3>
                <p className="text-gray-600">
                  Browse motivational and soothing stories to lift your mood and
                  inspire positivity.
                </p>
              </div>
              <div className="bg-white bg-opacity-70 rounded-xl shadow p-6 w-full sm:w-80 md:w-96 min-w-[16rem] min-h-[240px] text-center flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-opacity-90">
                <h3 className="font-bold text-xl mb-2 text-pink-700">
                  Community
                </h3>
                <p className="text-gray-600">
                  Connect with others, share experiences, and support each other
                  in a safe space.
                </p>
              </div>
              <div className="bg-white bg-opacity-70 rounded-xl shadow p-6 w-full sm:w-80 md:w-96 min-w-[16rem] min-h-[240px] text-center flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-opacity-90">
                <h3 className="font-bold text-xl mb-2 text-purple-700">
                  Professional & Progress
                </h3>
                <p className="text-gray-600">
                  Connect with professionals, use smart journaling features, and
                  track your recovery with a personalized dashboard.
                </p>
              </div>
            </div>
          </div>
          {/* Motivational Objective Section */}
          <div className="max-w-3xl mx-auto mt-4 mb-4 px-2 sm:px-4">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-3">
              Our Mission
            </h2>
            <p className="text-center text-base sm:text-lg text-gray-700">
              AI Saathi is dedicated to empowering youth to take charge of their
              mental wellness journey. Our platform offers a safe, supportive space
              to express yourself, find encouragement, and build healthy habits.
              Whether you need a moment of motivation, a listening ear, or tools to
              track your progress, we’re here to help you grow stronger every day.
            </p>
          </div>
        </div>
      </main>
      {/* Disclaimer */}
      <div className="w-full mt-8 mb-4 flex justify-center px-2">
        <p className="text-center text-xs sm:text-sm text-gray-500 max-w-xl px-2">
          <strong>Disclaimer:</strong> AI Saathi is a supportive tool designed to
          help you manage stress and promote mental wellness. It is{" "}
          <span className="font-semibold text-red-500">
            not a substitute for professional therapy or medical advice
          </span>
          . If you are experiencing severe distress or a crisis, please seek help
          from a qualified mental health professional.
        </p>
      </div>
    </div>
  );
}
