const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/authMiddleware");
const { signupUser, loginUser, getAllUser } = require("../controllers/user");

router.post("/signup", userAuthentication, signupUser);
router.post("/login", userAuthentication, loginUser);
router.get("/get", userAuthentication, getAllUser);

module.exports = router;
