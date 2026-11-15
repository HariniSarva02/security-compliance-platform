
const User = require("../models/User");
const logActivity = require("../utils/logActivity");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password and role are required.",
      });
    }

    const allowedRoles = [
      "Admin",
      "Compliance Officer",
      "Auditor",
      "Department Owner",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid user role.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      department: department || "",
    });

    await logActivity({
      userId: req.user.id,
      action: "Created",
      module: "User",
      description: `Created user ${user.name}`,
      resourceId: user._id.toString(),
    });

    res.status(201).json({
      message: "User created successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAssignableUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role")
      .sort({ name: 1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const resetUserPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await logActivity({
      userId: req.user.id,
      action: "Updated",
      module: "User",
      description: `Reset password for user ${user.name}`,
      resourceId: user._id.toString(),
    });

    res.status(200).json({
      message: "Password reset successfully.",
    });
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

    await logActivity({
      userId: req.user.id,
      action: "Updated",
      module: "User",
      description: `Updated user ${updatedUser.name}`,
      resourceId: updatedUser._id.toString(),
    });

    res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getAssignableUsers,
  updateUser,
  resetUserPassword,
};