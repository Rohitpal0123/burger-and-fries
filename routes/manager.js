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
  require("../controllers/Verification/userVerification").process
);

router.post(
  "/submitOtp",
  require("../controllers/User/verifiedEmailSignup").process
);

router.post("/login", require("../controllers/User/login").process);

router.get("/get", require("../controllers/User/getAll").process);

router.delete("/delete", require("../controllers/User/deleteAll").process);
module.exports = router;
