import { useState, useContext, useEffect } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
