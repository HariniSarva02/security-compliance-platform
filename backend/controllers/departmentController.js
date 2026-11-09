const Department = require("../models/Department");

// Create department
const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json({
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};