import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaWindows } from "react-icons/fa";
import LeftBox from "../components/LeftBox.jsx";
import FloatingBubbles from "../components/FloatingBubbles/FloatingBubbles.jsx";

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

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-purple-200 to-blue-200">
      <FloatingBubbles />
      {/* Additional Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 rounded-full filter blur-xl"
        style={{
          background: "rgba(147, 51, 234, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.4), 0 0 60px rgba(147, 51, 234, 0.3)",
        }}
        animate={{
          x: ["-300%", "100%", "-200%", "200%", "-300%"],
          y: ["-300%", "200%", "-100%", "300%", "-300%"],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 right-10 w-24 h-24 rounded-full filter blur-md"
        style={{
          background: "rgba(59, 130, 246, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)",
        }}
        animate={{
          x: ["-300%", "200%", "-100%", "300%", "-300%"],
          y: ["-300%", "100%", "-200%", "300%", "-300%"],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      {/* Login Card */}
      <div
        className="flex w-[700px] h-[500px] rounded-2xl shadow-xl overflow-hidden mx-auto mt-20 z-10 relative"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
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
            className="bg-white px-5 py-1 rounded-full shadow hover:bg-gray-100 mx-auto mb-6"
            onClick={handleSubmit}
          >
            log in
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
