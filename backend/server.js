const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const ownerRoutes = require("./routes/owners")
const landHoldingRoutes = require("./routes/landholdings")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")
const uploadRoutes = require("./routes/uploads")
const path = require("path")

dotenv.config()

const app = express()
connectDB()

/* deployment */
// app.use(express.static(path.join(__dirname, "/client/dist")))

// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/dist/index.html"))
// )
/* deployment */

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)

app.use("/api", uploadRoutes)

app.use("/api/owners", ownerRoutes)
app.use("/api/landholdings", landHoldingRoutes)

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// const express = require("express")
// const cors = require("cors")
// const connectDB = require("./config/db")
// const ownerRoutes = require("./routes/owners")
// const landHoldingRoutes = require("./routes/landholdings")
// const dotenv = require("dotenv")
// const authRoutes = require("./routes/auth")
// const uploadRoutes = require("./routes/uploads")
// const path = require("path")

// dotenv.config()

// const app = express()
// connectDB()

// app.use(express.static(path.join(__dirname, "../land-hold/dist")))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../land-hold/dist/index.html"))
// })

// app.use(cors())
// app.use(express.json())
// app.use("/api/auth", authRoutes)
// app.use("/api", uploadRoutes)
// app.use("/api/owners", ownerRoutes)
// app.use("/api/landholdings", landHoldingRoutes)

// // Serve static files from the uploads directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
