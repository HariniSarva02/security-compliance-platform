const express = require("express");
const router = express.Router();

const {
  createControl,
  getControls,
  getControlById,
  updateControl,
  deleteControl,
} = require("../controllers/controlController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect);

// Create control
router.post(
  "/",
  authorizeRoles("Admin", "Compliance Officer"),
  createControl
);

// Get all controls
router.get("/", getControls);

// Get control by ID
router.get("/:id", getControlById);

// Update control
router.put(
  "/:id",
  authorizeRoles("Admin", "Compliance Officer"),
  updateControl
);

// Delete control
router.delete("/:id", authorizeRoles("Admin"),
  deleteControl
);

module.exports = router;