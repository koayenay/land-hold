// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setAuth({ token, isAuthenticated: true })
      console.log("Auth state after initialization:", {
        token,
        isAuthenticated: true,
      })
    } else {
      console.log("No token found during initialization.")
    }
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    setAuth({ token, isAuthenticated: true })
    console.log("Auth state after login:", { token, isAuthenticated: true })
    navigate("/dashboard")
  }

  const logout = () => {
    localStorage.removeItem("token")
    setAuth({ token: null, isAuthenticated: false })
    console.log("Auth state after logout:", {
      token: null,
      isAuthenticated: false,
    })
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
