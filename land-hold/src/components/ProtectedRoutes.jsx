// src/components/ProtectedRoutes.jsx
import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext)
  console.log("Auth state in ProtectedRoutes:", auth)

  if (!auth.isAuthenticated) {
    console.log("User is not authenticated, redirecting to login.")
    return <Navigate to='/login' />
  }

  console.log("User is authenticated, rendering children.")
  return children
}

export default ProtectedRoutes
