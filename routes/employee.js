const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateManager
} = require("../middleware/authMiddleware");

router.post(
  "/signup",
  authenticateUser,
  authenticateManager,
  require("../controllers/User/signup").process
);

router.post("/login", require("../controllers/User/login").process);

module.exports = router;
