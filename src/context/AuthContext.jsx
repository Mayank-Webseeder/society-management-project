import React from 'react'
import { createContext, useState, useEffect, useContext } from "react";
import {login , signup} from '../services/authService';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from "../utils/Token";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  // State me token & user
  const [token, setTokenState] = useState(getToken());
  const [user, setUserState] = useState(getUser());

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    if (storedToken) setTokenState(storedToken); //storing in state also
    if (storedUser) setUserState(storedUser);
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login({ email, password });

    // Dummy credential check
    if (
      email !== "admin@societyportal.com" ||
      password !== "Society@admin"
    ) {
      throw new Error("Invalid admin credentials");
    }

      // dummy token & user , will replace after api
      const dummyToken = "dummy-token-12345";
      const dummyUser = {
        name: "Admin User",
        email: response.email,
        role: "admin",
      };

      // Local storage me save
      setToken(dummyToken);
      setUser(dummyUser);

      // State me bhi save
      setTokenState(dummyToken);
      setUserState(dummyUser);

      return true;

    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const handleSignup = async ({ name, email, password }) => {
    try {
      const response = await signup({ name, email, password });

      // Signup ke baad login jaisa hi handle karo (optional)
      // Abhi dummy token/user
      const dummyToken = "dummy-token-12345";
      const dummyUser = {
        name: response.name,
        email: response.email,
        role: "admin",
      };

      setToken(dummyToken);
      setUser(dummyUser);

      setTokenState(dummyToken);
      setUserState(dummyUser);

      return true;
    } catch (err) {
      console.error("Signup failed:", err);
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
    <AuthContext.Provider value={{ token, user, handleLogin, handleSignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

