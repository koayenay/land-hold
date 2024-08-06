const express = require("express")
const multer = require("multer")
const path = require("path")
const { auth } = require("../middleware/authMiddleware")

const router = express.Router()
// https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/
// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type"), false)
  }
}

const upload = multer({ storage, fileFilter })

// Route for uploading files for Owners
router.post(
  "/upload/owner/:ownerId",
  auth,
  upload.single("file"),
  (req, res) => {
    try {
      // File path to be returned
      const filePath = `/uploads/${req.file.filename}`

      // Process file and update database with file path and metadata
      res.status(200).json({
        message: "File uploaded successfully",
        filePath, // Include the URL in the response
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "File upload failed" })
    }
  }
)
router.get("/api/uploads/owner/:ownerName", (req, res) => {
  const ownerName = req.params.ownerName
  const directoryPath = path.join(__dirname, "uploads", "owner", ownerName)

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan files" })
    }

    // Return the list of files
    res.json({ files })
  })
})
// Route for uploading files for Land Holdings
router.post(
  "/upload/landholding/:landholdingId",
  auth,
  upload.single("file"),
  (req, res) => {
    try {
      // File path to be returned
      const filePath = `/uploads/${req.file.filename}`

      // Process file and update database with file path and metadata
      res.status(200).json({
        message: "File uploaded successfully",
        filePath, // Include the URL in the response
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "File upload failed" })
    }
  }
)

module.exports = router
