const express = require("express");
const router = express.Router();
const {
  addRole,
  getRole,
  updateRole,
  deleteRole
} = require("../controllers/role");
const userAuthentication = require("../middleware/authMiddleware");

router.post("/add", userAuthentication, addRole);
router.get("/get", userAuthentication, getRole);
router.put("/update/:id", userAuthentication, updateRole);
router.delete("/delete/:id", userAuthentication, deleteRole);

module.exports = router;
