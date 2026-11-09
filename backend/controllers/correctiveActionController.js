const CorrectiveAction = require("../models/CorrectiveAction");

const createCorrectiveAction = async (req, res) => {
  try {
    const action = await CorrectiveAction.create(req.body);

    res.status(201).json({
      message: "Corrective action created successfully.",
      action,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCorrectiveActions = async (req, res) => {
  try {
    const actions = await CorrectiveAction.find()
      .populate("finding", "title severity")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCorrectiveAction,
  getCorrectiveActions,
};