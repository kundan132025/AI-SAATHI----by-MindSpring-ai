import { useState, useContext } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);

const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const res = await axios.post("/auth/register", form);
    login(res.data.token);
  } catch (err) {
    setError("Registration failed. Please try again.");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-8 rounded-2xl shadow-xl w-[700px]">
        <h2 className="text-lg font-bold mb-6 text-center">Create Your Account</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded-lg mb-4 shadow-inner focus:outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-5 py-2 rounded-full shadow hover:bg-blue-500 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
