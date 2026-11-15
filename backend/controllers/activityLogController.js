const ActivityLog = require("../models/ActivityLog");

// Get all activity logs
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email role");

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve activity logs",
      error: error.message,
    });
  }
};

module.exports = { getActivityLogs };
