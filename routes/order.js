const express = require("express");
const router = express.Router();
const {
  authenticateEmployee,
  authenticateUser
} = require("../middleware/authMiddleware");

router.post(
  "/signup",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/User/signup").process
);

router.post("/login", require("../controllers/User/login").process);
module.exports = router;