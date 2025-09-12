import { useState, useContext, useEffect } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      window.history.replaceState({}, document.title, "/dashboard"); 
    }
  }, [login]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/auth/login", form);
    login(res.data.token);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>

      <a href="http://localhost:5000/api/auth/google">
        <button>Login with Google</button>
      </a>
    </div>
  );
}
