const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateUser,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getUsers);

router.put("/:id", protect, adminOnly, updateUser);

module.exports = router;
