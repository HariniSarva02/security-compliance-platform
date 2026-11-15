const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getAssignableUsers,
  updateUser,
  resetUserPassword,

} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getUsers);
router.get("/assignable", protect, getAssignableUsers);

router.post("/", protect, adminOnly, createUser);

router.put("/:id", protect, adminOnly, updateUser);
router.patch("/:id/reset-password", protect, adminOnly, resetUserPassword);

module.exports = router;