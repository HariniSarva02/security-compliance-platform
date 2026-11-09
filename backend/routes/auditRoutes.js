const express = require("express");
const router = express.Router();

const {
  createAudit,
  getAudits,
  getAuditById,
  updateAudit,
  deleteAudit,
} = require("../controllers/auditController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect);

// Create audit
router.post(
  "/",
  authorizeRoles("Admin", "Compliance Officer"),
  createAudit
);

// Get all audits
router.get("/", getAudits);

// Get audit by ID
router.get("/:id", getAuditById);

// Update audit
router.put(
  "/:id",
  authorizeRoles("Admin", "Compliance Officer", "Auditor"),
  updateAudit
);

// Delete audit
router.delete("/:id", authorizeRoles("Admin"), deleteAudit);

module.exports = router;