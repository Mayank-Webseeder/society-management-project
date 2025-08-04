import React, { createContext, useState, useContext } from "react";
import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
} from "../utils/Token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken());
  const [user, setUserState] = useState(getUser());

  const handleLogin = async ({ token, role, subrole }) => {
    try {
      const userData = { role, subrole };
      setToken(token);
      setUser(userData);
      setTokenState(token);
      setUserState(userData);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setTokenState(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
