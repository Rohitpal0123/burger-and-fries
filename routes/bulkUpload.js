const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();

// Specify the directory to save uploaded files
const uploadDir = path.join(__dirname, "../uploads");
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

// Configure Multer for handling file uploads and saving to disk
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function(req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

router.post(
  "/uploadProduct",
  authenticateUser,
  upload.single("productSheet"),
  require("../controllers/Bulk-upload/product").process
);

module.exports = router;
