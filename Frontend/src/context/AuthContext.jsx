import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // Restore user from localStorage on mount
  useEffect(() => {
    console.log('🔄 AuthContext: Checking localStorage for user...');
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('✅ AuthContext: Restored user from localStorage:', userData);
        setUser(userData);
      } catch (error) {
        console.error('❌ AuthContext: Failed to parse stored user:', error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else if (storedToken) {
      // Fallback: if we have token but no user data, try to decode
      try {
        console.log('🔄 AuthContext: No user data, trying to decode token...');
        const decoded = jwtDecode(storedToken);
        const userObj = { ...decoded, token: storedToken };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        console.log('✅ AuthContext: Created user from token:', userObj);
      } catch (error) {
        console.error('❌ AuthContext: Failed to decode token:', error);
        localStorage.removeItem("token");
      }
    } else {
      console.log('ℹ️ AuthContext: No stored user or token found');
    }
  }, []);

  const login = (tokenOrUserData) => {
    try {
      console.log('🔐 AuthContext: Login called with:', typeof tokenOrUserData);
      
      let userObj;
      
      if (typeof tokenOrUserData === 'string') {
        // It's a JWT token
        console.log('🔑 AuthContext: Decoding JWT token...');
        const decoded = jwtDecode(tokenOrUserData);
        userObj = { ...decoded, token: tokenOrUserData };
      } else {
        // It's already a user object
        console.log('👤 AuthContext: Using provided user object...');
        userObj = tokenOrUserData;
      }
      
      console.log('✅ AuthContext: Setting user:', userObj);
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      
      // Also store token separately if it exists
      if (userObj.token) {
        localStorage.setItem("token", userObj.token);
      }
    } catch (error) {
      console.error('❌ AuthContext: Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
