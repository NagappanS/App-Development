import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for token on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      // Optionally: Validate token and retrieve user info here
      setIsAuthenticated(true);
      // Optionally: Set user details if available
      setUser(JSON.parse(localStorage.getItem('user'))); 
    }
  }, []);

  const login = (userData) => {
    // Store token and user data in local storage
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/admin');
  };

  const logout = () => {
    // Remove token and user data from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
