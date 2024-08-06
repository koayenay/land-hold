const express = require("express")
const LandHolding = require("../models/LandHolding")
const auth = require("../middleware/authMiddleware")
const router = express.Router()

// Get all land holdings
router.get("/", async (req, res) => {
  try {
    const landHoldings = await LandHolding.find().populate("owner")
    res.json(landHoldings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new land holding
router.post("/", async (req, res) => {
  const {
    name,
    owner,
    legalEntity,
    netMineralAcres,
    mineralOwnerRoyalty,
    sectionName,
    section,
    township,
    range,
    titleSource,
  } = req.body

  const landHolding = new LandHolding({
    name,
    owner,
    legalEntity,
    netMineralAcres,
    mineralOwnerRoyalty,
    sectionName,
    section,
    township,
    range,
    titleSource,
  })

  try {
    const newLandHolding = await landHolding.save()
    res.status(201).json(newLandHolding)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update a land holding
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const {
    name,
    owner,
    legalEntity,
    netMineralAcres,
    mineralOwnerRoyalty,
    sectionName,
    section,
    township,
    range,
    titleSource,
  } = req.body

  try {
    const updatedLandHolding = await LandHolding.findByIdAndUpdate(
      id,
      {
        name,
        owner,
        legalEntity,
        netMineralAcres,
        mineralOwnerRoyalty,
        sectionName,
        section,
        township,
        range,
        titleSource,
      },
      { new: true }
    )
    if (!updatedLandHolding)
      return res.status(404).json({ message: "Land holding not found" })
    res.json(updatedLandHolding)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a land holding
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const deletedLandHolding = await LandHolding.findByIdAndDelete(id)
    if (!deletedLandHolding)
      return res.status(404).json({ message: "Land holding not found" })
    res.json({ message: "Land holding deleted" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

// const express = require("express")
// const router = express.Router()
// const auth = require("../middleware/authMiddleware")
// const LandHolding = require("../models/LandHolding")

// // Get all land holdings (protected route)
// router.get("/", async (req, res) => {
//   try {
//     const landHoldings = await LandHolding.find()
//     res.json(landHoldings)
//   } catch (error) {
//     console.error("Error fetching land holdings:", error)
//     res.status(500).json({ message: "Server error" })
//   }
// })

// // Add new land holding (protected route)
// router.post("/", async (req, res) => {
//   const {
//     name,
//     owner,
//     legalEntity,
//     netMineralAcres,
//     mineralOwnerRoyalty,
//     section,
//     township,
//     range,
//   } = req.body

//   try {
//     const newLandHolding = new LandHolding({
//       name,
//       owner,
//       legalEntity,
//       netMineralAcres,
//       mineralOwnerRoyalty,
//       section,
//       township,
//       range,
//     })

//     const savedLandHolding = await newLandHolding.save()
//     res.status(201).json(savedLandHolding)
//   } catch (error) {
//     console.error("Error creating land holding:", error)
//     res.status(500).json({ message: "Server error" })
//   }
// })

// module.exports = router
