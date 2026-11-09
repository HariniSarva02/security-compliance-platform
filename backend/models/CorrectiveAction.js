const mongoose = require("mongoose");

const correctiveActionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    finding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Finding",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Overdue"],
      default: "Open",
    },
    closureNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CorrectiveAction", correctiveActionSchema);