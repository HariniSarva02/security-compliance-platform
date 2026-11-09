const Policy = require("../models/Policy");

// Create a new policy
const createPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);

    res.status(201).json({
      message: "Policy created successfully!",
      policy,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create policy.",
      error: error.message,
    });
  }
};

// Get all policies
const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });

    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch policies.",
      error: error.message,
    });
  }
};

// Get policy by ID
const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found.",
      });
    }

    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch policy.",
      error: error.message,
    });
  }
};

// Update policy
const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found.",
      });
    }

    res.status(200).json({
      message: "Policy updated successfully!",
      policy,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update policy.",
      error: error.message,
    });
  }
};

// Delete policy
const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found.",
      });
    }

    res.status(200).json({
      message: "Policy deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete policy.",
      error: error.message,
    });
  }
};

module.exports = {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
};