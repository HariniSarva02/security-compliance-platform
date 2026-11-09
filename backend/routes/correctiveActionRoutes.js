const express = require("express");
const router = express.Router();

const {
  createCorrectiveAction,
  getCorrectiveActions,
} = require("../controllers/correctiveActionController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect);

router.post(
  "/",
  authorizeRoles("Admin", "Compliance Officer", "Auditor"),
  createCorrectiveAction
);

router.get("/", getCorrectiveActions);

module.exports = router;