const mongoose = require("mongoose")

// LandHolding Schema Based on the document provided
const landHoldingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: function () {
      return `${this.sectionName} - ${this.legalEntity}`
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  legalEntity: {
    type: String,
    required: true,
  },
  netMineralAcres: {
    type: Number,
    required: true,
  },
  mineralOwnerRoyalty: {
    type: Number,
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
    default: function () {
      return `${this.section}-${this.township}-${this.range}`
    },
  },
  section: {
    type: String,
    required: true,
    match: /^\d{3}$/,
  },
  township: {
    type: String,
    required: true,
    match: /^\d{3}[NS]$/,
  },
  range: {
    type: String,
    required: true,
    match: /^\d{3}[EW]$/,
  },
})

const LandHolding = mongoose.model("LandHolding", landHoldingSchema)
module.exports = LandHolding
