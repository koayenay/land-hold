// backend/config/multer.js
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const Owner = require("../models/Owner") // Import the Owner model

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { entityType, entityId } = req.params

    // Fetch the owner's details to get the owner's name
    let entityName = "unknown"
    if (entityType === "owner") {
      const owner = await Owner.findById(entityId)
      if (owner) {
        entityName = owner.ownerName.replace(/\s+/g, "_") // Replace spaces with underscores
      }
    }

    // Define the path for the upload
    const dir = path.join(__dirname, `../uploads/${entityType}/${entityName}`)

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true })

    // Set the destination
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    // Set the filename to include the original file name
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

module.exports = upload
