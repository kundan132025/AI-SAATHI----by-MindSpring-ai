import { useState, useContext } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { SiGoogle, SiApple } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/register", form);
      login(res.data.token);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="signup-container flex">
      {/* Left Side */}
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
        <p className="text-gray-700 mb-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log in
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-blue-400 p-8 flex flex-col justify-center">
        <h2 className="text-lg font-bold mb-6">Sign Up Your Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <label className="text-sm mb-1">Re-enter Password</label>
          <input
            type="password"
            className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />

          <button
            type="submit"
            className="bg-white px-5 py-1 rounded-full shadow hover:bg-gray-100 mx-auto mb-6"
          >
            sign up
          </button>
        </form>

        {/* Social Logins */}
        <div className="flex space-x-6 text-2xl mt-auto">
          <SiGoogle className="cursor-pointer text-red-500" />
          <FaWindows className="cursor-pointer text-blue-600" />
          <SiApple className="cursor-pointer text-black" />
        </div>
      </div>
    </div>
  );
}o