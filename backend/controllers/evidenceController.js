const Evidence = require("../models/Evidence");

// Upload evidence
const createEvidence = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an evidence file.",
      });
    }

    const { title, description, audit, control } = req.body;

    const evidence = await Evidence.create({
      title,
      description,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      audit,
      control,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Evidence uploaded successfully.",
      evidence,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all evidence
const getEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.find()
      .populate("audit", "title")
      .populate("control", "controlId title")
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(evidence);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvidence,
  getEvidence,
};