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

router.get("/get", require("../controllers/User/getAll").process);

router.delete("/delete", require("../controllers/User/deleteAll").process);
module.exports = router;
