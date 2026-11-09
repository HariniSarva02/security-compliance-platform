
const express = require("express");
const router = express.Router();

const {
  createFinding,
  getFindings,
  updateFinding,
  deleteFinding,
} = require("../controllers/findingController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect);

router.post(
  "/",
  authorizeRoles("Admin", "Compliance Officer", "Auditor"),
  createFinding
);

router.get("/", getFindings);

router.put(
  "/:id",
  authorizeRoles("Admin", "Compliance Officer", "Auditor"),
  updateFinding
);

router.delete(
  "/:id",
  authorizeRoles("Admin"),
  deleteFinding
);

module.exports = router;
