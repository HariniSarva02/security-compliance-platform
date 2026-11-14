const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { role, department } = req.body;

    if (role === undefined && department === undefined) {
      return res.status(400).json({
        message: "Please provide a role or department to update.",
      });
    }

    const allowedRoles = [
      "Admin",
      "Compliance Officer",
      "Auditor",
      "Department Owner",
    ];

    if (role !== undefined && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid user role.",
      });
    }

    const updates = {};

    if (role !== undefined) updates.role = role;
    if (department !== undefined) updates.department = department.trim();

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, updateUser };
