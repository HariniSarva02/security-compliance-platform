
const Finding = require("../models/Finding");

const createFinding = async (req, res) => {
  try {
    const finding = await Finding.create(req.body);

    res.status(201).json({
      message: "Finding created successfully.",
      finding,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFindings = async (req, res) => {
  try {
    const findings = await Finding.find()
      .populate("audit", "title")
      .populate("control", "controlId title")
      .populate("asset", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(findings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFinding = async (req, res) => {
  try {
    const finding = await Finding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!finding) {
      return res.status(404).json({ message: "Finding not found." });
    }

    res.status(200).json({
      message: "Finding updated successfully.",
      finding,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFinding = async (req, res) => {
  try {
    const finding = await Finding.findByIdAndDelete(req.params.id);

    if (!finding) {
      return res.status(404).json({ message: "Finding not found." });
    }

    res.status(200).json({
      message: "Finding deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFinding,
  getFindings,
  updateFinding,
  deleteFinding,
};
