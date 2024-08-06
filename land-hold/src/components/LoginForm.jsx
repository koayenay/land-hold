// src/components/LoginForm.jsx
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"

const LoginForm = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/auth/login", { email, password })

      if (response.data.token) {
        login(response.data.token)
        navigate("/dashboard")
      }
    } catch (error) {
      setError("Invalid login credentials.") // Set error message on failure
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email:
            </label>
            <input
              type='email'
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password:
            </label>
            <input
              type='password'
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Login
          </button>
        </form>
        <p className='mt-4 text-center'>
          Don't have an account?{" "}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
