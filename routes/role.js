const express = require("express");
const router = express.Router();

const {
  addRole,
  getRole,
  updateRole,
  deleteRole
} = require("../controllers/role");

router.post("/add", addRole);
router.get("/get", getRole);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

module.exports = router;
