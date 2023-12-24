const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateEmployee,
  authenticateManager
} = require("../middleware/authMiddleware");

router.post(
  "/signupUser",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/User/signup").process
);

router.post(
  "/signupEmployee",
  authenticateUser,
  authenticateManager,
  require("../controllers/User/signup").process
);

router.post("/signupManager", require("../controllers/User/signup").process);

router.post("/login", require("../controllers/User/login").process);
router.get("/get", require("../controllers/User/getAll").process);

router.delete("/delete", require("../controllers/User/deleteAll").process);
module.exports = router;
