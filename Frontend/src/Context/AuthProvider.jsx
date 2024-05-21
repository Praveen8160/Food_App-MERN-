import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Authentication/Auth",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    checkAuth();
  };
  const logout = async () => {
    await axios.post(
      "http://localhost:5000/Authentication/Logout",
      {},
      { withCredentials: true }
    );
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
