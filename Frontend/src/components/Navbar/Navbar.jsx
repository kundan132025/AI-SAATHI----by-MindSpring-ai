import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="navbar fixed top-0 left-0 w-full z-50">
      <div className="brand">AI SAATHI</div>
      <div className="nav-actions">
        <button className="btn dark focus:outline-none" onClick={() => navigate("/login")}>Log In</button>
        <button className="btn light focus:outline-none" onClick={() => navigate("/register")}>Sign Up</button>
      </div>
    </header>
  );
}
