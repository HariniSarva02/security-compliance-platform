const express = require("express");
const router = express.Router();

const {
  getUsers,
  getAssignableUsers,
  updateUser,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getUsers);
router.get("/assignable", protect, getAssignableUsers);

router.put("/:id", protect, adminOnly, updateUser);

module.exports = router;
