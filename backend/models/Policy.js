const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    version: {
      type: String,
      default: "1.0",
    },

    owner: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Draft", "Pending Approval", "Approved", "Archived"],
      default: "Draft",
    },

    effectiveDate: {
      type: Date,
    },

    reviewDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);