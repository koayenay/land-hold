// src/components/Navbar.jsx
import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-white text-2xl'>
          Welcome to Land Holding Management
        </h1>
      </div>
    </nav>
  )
}

export default Navbar
