import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";

fetch(`${API_URL}/tasks`)
  .then(response => response.json())
  .then(data => console.log(data));

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track authentication check

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/auth/me`, { headers: { "x-auth-token": token } })
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false)); // Stop loading after request
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContext;
