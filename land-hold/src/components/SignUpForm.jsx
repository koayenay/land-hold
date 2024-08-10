import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import Navbar from "./Navbar"

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/auth/signup", { email, password })
      setMessage(response.data.message)
      setIsSuccess(true)
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message)
      } else {
        setMessage("Error occurred during sign-up")
      }
      setIsSuccess(false)
    }
  }

  const handleLoginRedirect = () => {
    navigate("/login")
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-center mb-6'>Sign Up</h1>
          {message && (
            <div
              className={`mb-4 p-2 text-center text-white rounded ${
                isSuccess ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Sign Up
            </button>
            <button
              type='button'
              onClick={handleLoginRedirect}
              className='w-full mt-4 text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Go to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
