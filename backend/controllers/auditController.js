const Audit = require("../models/Audit");

// Create audit
const createAudit = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);

    res.status(201).json({
      message: "Audit scheduled successfully!",
      audit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create audit.",
      error: error.message,
    });
  }
};

// Get all audits
const getAudits = async (req, res) => {
  try {
    const audits = await Audit.find()
      .populate("department", "name")
      .populate("auditor", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(audits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch audits.",
      error: error.message,
    });
  }
};

// Get audit by ID
const getAuditById = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id)
      .populate("department", "name")
      .populate("auditor", "name email role");

    if (!audit) {
      return res.status(404).json({
        message: "Audit not found.",
      });
    }

    res.status(200).json(audit);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch audit.",
      error: error.message,
    });
  }
};

// Update audit
const updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!audit) {
      return res.status(404).json({
        message: "Audit not found.",
      });
    }

    res.status(200).json({
      message: "Audit updated successfully!",
      audit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update audit.",
      error: error.message,
    });
  }
};

// Delete audit
const deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);

    if (!audit) {
      return res.status(404).json({
        message: "Audit not found.",
      });
    }

    res.status(200).json({
      message: "Audit deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete audit.",
      error: error.message,
    });
  }
};

module.exports = {
  createAudit,
  getAudits,
  getAuditById,
  updateAudit,
  deleteAudit,
};