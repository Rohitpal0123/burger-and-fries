const express = require("express");
const router = express.Router();
const {
  authenticateEmployee,
  authenticateUser
} = require("../middleware/authMiddleware");

router.post(
  "/signup",
  // authenticateEmployee,
  require("../controllers/User/signup").process
);
router.post("/login", require("../controllers/User/login").process);
router.get(
  "/get",
  authenticateUser,
  require("../controllers/User/getAll").process
);

module.exports = router;
