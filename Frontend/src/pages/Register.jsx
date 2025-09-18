import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle, FaApple, FaWindows } from "react-icons/fa";
import LeftBox from "../components/LeftBox.jsx";
import FloatingBubbles from "../components/FloatingBubbles/FloatingBubbles.jsx";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [thought, setThought] = useState({ text: "", author: "" });
  const { register } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      register(token);
      window.history.replaceState({}, document.title, "/dashboard"); 
    }
  }, [register]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await axios.post("/auth/register", form);
    register(res.data.token);
  };
 
   
  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-purple-200 to-blue-200">
      <FloatingBubbles />
      {/* Additional Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 rounded-full filter blur-xl"
        style={{
          background: 'rgba(147, 51, 234, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.4), 0 0 60px rgba(147, 51, 234, 0.3)'
        }}
        animate={{ x: ["-300%", "100%", "-200%", "200%", "-300%"], y: ["-300%", "200%", "-100%", "300%", "-300%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 right-10 w-24 h-24 rounded-full filter blur-md"
        style={{
          background: 'rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)'
        }}
        animate={{ x: ["-300%", "200%", "-100%", "300%", "-300%"], y: ["-300%", "100%", "-200%", "300%", "-300%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      {/* Register Card */}
      <div className="flex w-[700px] h-[500px] rounded-2xl shadow-xl overflow-hidden mx-auto mt-20 z-10 relative" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
        {/* Left Side */}

        <LeftBox />

        {/* Right Side */}
        <div className="w-1/2 bg-blue-400 p-8 flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-6">Sign Up Your Account</h2>

          <label className="text-sm mb-1">Username</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <label className="text-sm mb-1">E-Mail</label>
          <input
            type="email"
            className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label className="text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <label className="text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />

          <button
            className="bg-white px-5 py-1 rounded-full shadow hover:bg-gray-100 mx-auto mb-6"
            onClick={handleSubmit}
          >
            sign up
          </button>
          {/* Social Logins */}
          <div className="flex space-x-6 text-2xl justify-center">
            <FaGoogle className="cursor-pointer text-red-500" />
            <FaWindows className="cursor-pointer text-blue-600" />
            <FaApple className="cursor-pointer text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
