// const express = require("express")
// const multer = require("multer")
// const path = require("path")
// const { auth } = require("../middleware/authMiddleware")

// const router = express.Router()
// // https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/
// // Setup multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/") // Specify the directory for file uploads
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)) // Rename the file
//   },
// })

// // File filter to restrict file types
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true)
//   } else {
//     cb(new Error("Invalid file type"), false)
//   }
// }

// const upload = multer({ storage, fileFilter })

// // Route for uploading files for Owners
// router.post(
//   "/upload/owner/:ownerId",
//   auth,
//   upload.single("file"),
//   (req, res) => {
//     try {
//       // Process file and update database with file path and metadata
//       res.status(200).json({
//         message: "File uploaded successfully",
//         filePath: req.file.path,
//       })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: "File upload failed" })
//     }
//   }
// )

// // Route for uploading files for Land Holdings
// router.post(
//   "/upload/landholding/:landholdingId",
//   auth,
//   upload.single("file"),
//   (req, res) => {
//     try {
//       // Process file and update database with file path and metadata
//       res.status(200).json({
//         message: "File uploaded successfully",
//         filePath: req.file.path,
//       })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: "File upload failed" })
//     }
//   }
// )

// module.exports = router
