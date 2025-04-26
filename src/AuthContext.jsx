import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// create auth context
export const AuthContext = createContext()

// helper function to get initial auth state
const getInitialAuthState = () => {
  const storedToken = localStorage.getItem("token")
  const storedUser = localStorage.getItem("user")

  return {
    isAuthenticated: !!(storedToken && storedUser),
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getInitialAuthState())
  const [loading, setLoading] = useState(true)

  const updateAuthState = useCallback((newState) => {
    setAuthState(prev => ({
      ...prev, ...newState
    }))
  }, [])

  const login = useCallback((token, userData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))

    updateAuthState({
      isAuthenticated: true,
      user: userData,
      token: token
    })
  }, [updateAuthState])

  const register = useCallback((token, userData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))

    updateAuthState({
      isAuthenticated: true,
      user: userData,
      token: token
    })
  }, [updateAuthState])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    updateAuthState({
      isAuthenticated: false, user: null, token: null
    })
  }, [updateAuthState])

  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser)
        updateAuthState({
          isAuthenticated: true,
          user,
          token: storedToken
        })
      } catch (error) {
        console.error("Failed to parse user data:", error)
        logout()
      }
    } else {
      logout()
    }
    setLoading(false)
  }, [updateAuthState, logout])

  useEffect(() => {
    checkAuth()

    const interval = setInterval(() => {
      checkAuth();
    }, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [checkAuth])

  const contextValue = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    token: authState.token,
    loading,
    login,
    logout,
    register,
    checkAuth
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};