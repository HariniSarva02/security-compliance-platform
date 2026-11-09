const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: "",
    },
    fileSize: {
      type: Number,
      default: 0,
    },
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
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending Review", "Approved", "Rejected"],
      default: "Pending Review",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evidence", evidenceSchema);