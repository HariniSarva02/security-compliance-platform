const ActivityLog = require("../models/ActivityLog");
const User = require("../models/User");

const logActivity = async ({
  userId,
  action,
  module,
  description,
  resourceId = "",
}) => {
  try {
    const user = userId
      ? await User.findById(userId).select("name role")
      : null;

    await ActivityLog.create({
      user: user ? user._id : null,
      userName: user ? user.name : "System",
      userRole: user ? user.role : "",
      action,
      module,
      description,
      resourceId,
    });
  } catch (error) {
    console.error("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;
