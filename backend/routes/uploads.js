// backend/routes/uploads.js
const express = require("express")
const upload = require("../config/multer")
const router = express.Router()

router.post(
  "/upload/:entityType/:entityId",
  upload.single("file"),
  (req, res) => {
    try {
      // Handle the uploaded file and save the necessary information
      console.log("File uploaded successfully:", req.file)

      res.status(200).json({ message: "File uploaded successfully" })
    } catch (error) {
      console.error("File upload error:", error)
      res.status(500).json({ message: "Server error" })
    }
  }
)

module.exports = router
