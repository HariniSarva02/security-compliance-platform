const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// All department routes require authentication
router.use(protect);

// Department operations
router.post("/", authorizeRoles("Admin", "Compliance Officer"), createDepartment);
router.get("/", getDepartments);
router.get("/:id", getDepartmentById);
router.put("/:id", authorizeRoles("Admin", "Compliance Officer"), updateDepartment);
router.delete("/:id", authorizeRoles("Admin"), deleteDepartment);

module.exports = router;