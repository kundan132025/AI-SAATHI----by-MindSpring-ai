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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
