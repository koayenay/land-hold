const mongoose = require("mongoose")
const LandHolding = require("./LandHolding")

const ownerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  entityType: {
    type: String,
    enum: ["Company", "Individual", "Investor", "Trust"],
    required: true,
  },
  ownerType: {
    type: String,
    enum: ["Competitor", "Seller", "Investor", "Professional"],
    required: true,
  },
  address: { type: String },
  totalLandHoldings: { type: Number, default: 0 },
})

ownerSchema.index({ ownerName: 1, address: 1 }, { unique: true })

// Middleware to delete associated Land Holdings when an Owner is removed
//https://mongoosejs.com/docs/middleware.html
ownerSchema.pre("remove", async function (next) {
  try {
    await LandHolding.deleteMany({ owner: this._id })
    next()
  } catch (error) {
    next(error)
  }
})

const Owner = mongoose.model("Owner", ownerSchema)
module.exports = Owner
