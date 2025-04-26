import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// Create the AuthContext
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => { },
  logout: () => { },
  checkAuth: () => { },
});


// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Login function to store token and user in localStorage and update state
  const login = useCallback((newToken, userData) => {
    if (newToken !== token) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }

    if (JSON.stringify(userData) !== JSON.stringify(user)) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }

    if (!isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [token, user, isAuthenticated]);


  const register = useCallback((newToken, newUserData) => {
    if (newToken !== token) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }

    if (JSON.stringify(newUserData) !== JSON.stringify(user)) {
      localStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
    }

    if (!isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [token, user, isAuthenticated, setToken, setUser, setIsAuthenticated]);

  // Decoding JWT token (helper function)
  const decodeJWT = useCallback((token) => {
    try {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }, []);

  // Logout function to remove token and user from localStorage and reset state
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    console.log('Logged out');
  }, []);

  // Check if the user is authenticated from localStorage
  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedToken && storedUser) {
      login(storedToken, storedUser); // Now login is accessible before checkAuth is called
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [login]); // Now login is stable and will not cause issues

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Ensure it only runs once

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};