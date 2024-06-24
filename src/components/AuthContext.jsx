// AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData, callback) => {
    setIsAuthenticated(true);
    setUser(userData);
    if (callback) callback();
  };

  const logout = (callback) => {
    setIsAuthenticated(false);
    setUser(null);
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
