import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    console.log("DECODED:", decoded);
    const userObj = { ...decoded, token };
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  const register = async (formData) => {
    const res = await axios.post("/auth/register", formData);
    login(res.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
