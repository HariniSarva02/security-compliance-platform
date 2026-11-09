const express = require("express");
const router = express.Router();

const {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect);

// Create asset
router.post(
  "/",
  authorizeRoles("Admin", "Compliance Officer", "Department Owner"),
  createAsset
);

// Get all assets
router.get("/", getAssets);

// Get asset by ID
router.get("/:id", getAssetById);

// Update asset
router.put(
  "/:id",
  authorizeRoles("Admin", "Compliance Officer", "Department Owner"),
  updateAsset
);

// Delete asset
router.delete("/:id", authorizeRoles("Admin"), deleteAsset);

module.exports = router;