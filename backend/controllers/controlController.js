const Control = require("../models/Control");

// Create a control
const createControl = async (req, res) => {
  try {
    const control = await Control.create(req.body);

    res.status(201).json({
      message: "Control created successfully!",
      control,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create control.",
      error: error.message,
    });
  }
};

// Get all controls
const getControls = async (req, res) => {
  try {
    const controls = await Control.find()
      .populate("policy", "title version")
      .sort({ createdAt: -1 });

    res.status(200).json(controls);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch controls.",
      error: error.message,
    });
  }
};

// Get control by ID
const getControlById = async (req, res) => {
  try {
    const control = await Control.findById(req.params.id)
      .populate("policy", "title version");

    if (!control) {
      return res.status(404).json({
        message: "Control not found.",
      });
    }

    res.status(200).json(control);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch control.",
      error: error.message,
    });
  }
};

// Update control
const updateControl = async (req, res) => {
  try {
    const control = await Control.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!control) {
      return res.status(404).json({
        message: "Control not found.",
      });
    }

    res.status(200).json({
      message: "Control updated successfully!",
      control,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update control.",
      error: error.message,
    });
  }
};

// Delete control
const deleteControl = async (req, res) => {
  try {
    const control = await Control.findByIdAndDelete(req.params.id);

    if (!control) {
      return res.status(404).json({
        message: "Control not found.",
      });
    }

    res.status(200).json({
      message: "Control deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete control.",
      error: error.message,
    });
  }
};

module.exports = {
  createControl,
  getControls,
  getControlById,
  updateControl,
  deleteControl,
};

