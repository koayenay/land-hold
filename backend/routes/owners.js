const express = require("express")
const Owner = require("../models/Owner")
const LandHolding = require("../models/LandHolding")
const auth = require("../middleware/authMiddleware")
const upload = require("../config/multer") // Import the multer configuration
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const owners = await Owner.find()
    console.log("Owners fetched from MongoDB:", owners) // Log the owners
    res.json(owners)
  } catch (error) {
    console.error("Error fetching owners:", error)
    res.status(500).json({ message: error.message })
  }
})

// Create a new owner
router.post("/", async (req, res) => {
  try {
    const { ownerName, entityType, ownerType, address, totalLandHoldings } =
      req.body
    const owner = new Owner({
      ownerName,
      entityType,
      ownerType,
      address,
      totalLandHoldings,
    })

    const newOwner = await owner.save()
    res.status(201).json(newOwner)
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        message: "An owner with the same name and address already exists.",
      })
    }
    console.error("Error creating owner:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update an owner
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { ownerName, entityType, ownerType, address, totalLandHoldings } =
    req.body

  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
      id,
      { ownerName, entityType, ownerType, address, totalLandHoldings },
      { new: true }
    )
    if (!updatedOwner)
      return res.status(404).json({ message: "Owner not found" })
    res.json(updatedOwner)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete an owner and associated land holdings
router.delete("/:id", async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id)
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" })
    }

    // Delete associated land holdings
    await LandHolding.deleteMany({ owner: owner._id })

    // Delete the owner
    await Owner.findByIdAndDelete(req.params.id)

    res.json({ message: "Owner and associated land holdings deleted" })
  } catch (error) {
    console.error("Error deleting owner:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
