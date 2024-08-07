const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")
const router = express.Router()

// User sign-up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if the user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create a new user
    user = new User({ email, password })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(201).json({ message: "User registered successfully", token })
  } catch (error) {
    console.error("Error during sign-up:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid user information" })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login information" })
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.json({ message: "Login successful", token })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

