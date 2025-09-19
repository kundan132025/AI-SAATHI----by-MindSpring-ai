import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaWindows, FaArrowLeft } from "react-icons/fa";
import LeftBox from "../components/LeftBox.jsx";
import { API_BASE_URL } from "../config/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [thought, setThought] = useState({ text: "", author: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      window.history.replaceState({}, document.title, "/chat");
      navigate("/chat");
    }
    // eslint-disable-next-line
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      console.log("TOKEN:", res.data.token);
      login(res.data.token);
      navigate("/chat"); // Redirect to chat after login
    } catch (err) {
      // handle error
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
    // Replace with your backend's Google OAuth endpoint
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {/* Back to Home Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:bg-gray-100 absolute top-6 left-6"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-blue-500" />
        <span className="font-medium text-blue-700">Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="flex w-[700px] h-[400px] rounded-2xl shadow-xl overflow-hidden mx-auto mt-16">
        {/* Left Side */}
        <LeftBox />

        {/* Right Side */}
        <div className="w-1/2 bg-blue-400 p-8 flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-6">Log In Your Account</h2>
          
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

          <button
            className="bg-white px-5 py-1 rounded-full shadow hover:bg-gray-100 self-start mb-6"
            onClick={handleSubmit}
          >
            log in
          </button>
          {/* Social Logins */}
          <div className="flex space-x-6 text-2xl">
            <FaGoogle
              className="cursor-pointer text-red-500"
              onClick={handleGoogleLogin}
            />
            <FaWindows className="cursor-pointer text-blue-600" />
            <FaApple className="cursor-pointer text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Uncomment and move these outside the component if needed for reference:

// <form onSubmit={handleSubmit}>
//   <input type="email" placeholder="Email"
//     onChange={(e) => setForm({ ...form, email: e.target.value })} />
//   <input type="password" placeholder="Password"
//     onChange={(e) => setForm({ ...form, password: e.target.value })} />
//   <button type="submit">Login</button>
// </form>

// <a href="http://localhost:5000/api/auth/google">
//   <button>Login with Google</button>
// </a>
