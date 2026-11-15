
const CorrectiveAction = require("../models/CorrectiveAction");
const logActivity = require("../utils/logActivity");

const createCorrectiveAction = async (req, res) => {
  try {
    const action = await CorrectiveAction.create(req.body);

    await logActivity({
      userId: req.user.id,
      action: "Created",
      module: "Corrective Action",
      description: `Created corrective action ${action.title}`,
      resourceId: action._id.toString(),
    });

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


const updateCorrectiveAction = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      status,
      closureNotes,
    } = req.body;

    const updates = {};

    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (assignedTo !== undefined) updates.assignedTo = assignedTo;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (priority !== undefined) updates.priority = priority;
    if (status !== undefined) updates.status = status;
    if (closureNotes !== undefined) updates.closureNotes = closureNotes;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update.",
      });
    }

    const action = await CorrectiveAction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!action) {
      return res.status(404).json({
        message: "Corrective action not found.",
      });
    }

    await logActivity({
      userId: req.user.id,
      action: "Updated",
      module: "Corrective Action",
      description: `Updated corrective action ${action.title}`,
      resourceId: action._id.toString(),
    });

    res.status(200).json({
      message: "Corrective action updated successfully.",
      action,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  createCorrectiveAction,
  getCorrectiveActions,
  updateCorrectiveAction,
};