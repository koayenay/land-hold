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
// Route to list all files for a specific owner
router.get("/uploads/owner/:ownerName", (req, res) => {
  const ownerName = req.params.ownerName
  const directoryPath = path.join(
    __dirname,
    "..",
    "uploads",
    "owner",
    ownerName
  )

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan files!" })
    }
    // Return the list of file names
    res.status(200).json(files)
  })
})
module.exports = router
