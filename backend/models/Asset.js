const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    assetType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    owner: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    criticality: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Under Maintenance"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);