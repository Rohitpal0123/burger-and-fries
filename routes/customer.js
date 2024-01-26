const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateEmployee
} = require("../middleware/authMiddleware");

router.post(
  "/register",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/User/registerCustomer").process
);

module.exports = router;
