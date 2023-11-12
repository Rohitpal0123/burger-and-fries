const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/authMiddleware");

router.post("/signup", require("../controllers/User/signup").process);
router.post("/login", require("../controllers/User/login").process);
router.get(
  "/get",
  userAuthentication,
  require("../controllers/User/getAll").process
);

module.exports = router;
