const express = require("express");
const router = express.Router();

const {
  createEvidence,
  getEvidence,
} = require("../controllers/evidenceController");

const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG and PNG files are allowed."));
    }
  },
});


router.use(protect);

router.post("/", upload.single("file"), createEvidence);
router.get("/", getEvidence);

module.exports = router;