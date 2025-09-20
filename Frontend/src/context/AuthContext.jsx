import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simple one-time localStorage check on mount
  useEffect(() => {
    console.log('� AuthContext: Initial setup...');
    
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('✅ AuthContext: Restored user:', userData.email || userData.name);
        setUser(userData);
      } catch (error) {
        console.error('❌ AuthContext: Invalid stored user data');
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const userObj = { ...decoded, token: storedToken };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        console.log('✅ AuthContext: Created user from token');
      } catch (error) {
        console.error('❌ AuthContext: Invalid token');
        localStorage.removeItem("token");
      }
    } else {
      console.log('ℹ️ AuthContext: No stored credentials found');
    }
  }, []); // NO dependencies - run only once

  const login = (tokenOrUserData) => {
    try {
      console.log('🔐 AuthContext: Login called');
      
      let userObj;
      
      if (typeof tokenOrUserData === 'string') {
        // JWT token
        const decoded = jwtDecode(tokenOrUserData);
        userObj = { ...decoded, token: tokenOrUserData };
      } else {
        // User object
        userObj = tokenOrUserData;
      }
      
      console.log('✅ AuthContext: Setting user:', userObj.email || userObj.name);
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      
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
    localStorage.removeItem("token");
    // Reset the global OAuth flag for new login attempts
    window.oauthProcessed = false;
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
