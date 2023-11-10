const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/authMiddleware");

const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryControllers");

router.post("/add", userAuthentication, addCategory);
router.get("/get", userAuthentication, getCategory);
router.put("/update/:id", userAuthentication, updateCategory);
router.delete("/delete/:id", userAuthentication, deleteCategory);

module.exports = router;
