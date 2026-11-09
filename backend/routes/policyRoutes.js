const express = require("express");
const router = express.Router();

const {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// All routes require authentication
router.use(protect);

// Create policy
router.post(
  "/",
  authorizeRoles("Admin", "Compliance Officer"),
  createPolicy
);

// Get all policies
router.get("/", getPolicies);

// Get policy by ID
router.get("/:id", getPolicyById);

// Update policy
router.put(
  "/:id",
  authorizeRoles("Admin", "Compliance Officer"),
  updatePolicy
);

// Delete policy
router.delete("/:id", authorizeRoles("Admin"), deletePolicy);

module.exports = router;