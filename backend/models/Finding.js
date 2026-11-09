const mongoose = require("mongoose");

const findingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    audit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audit",
      required: true,
    },
    control: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Control",
      required: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    recommendation: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finding", findingSchema);