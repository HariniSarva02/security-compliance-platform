const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
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

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    auditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    auditType: {
      type: String,
      enum: ["Internal", "External"],
      default: "Internal",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "Scheduled",
    },

    findings: {
      type: String,
      default: "",
    },

    overallResult: {
      type: String,
      enum: ["Pending", "Compliant", "Non-Compliant", "Partially Compliant"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audit", auditSchema);