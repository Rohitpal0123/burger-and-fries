const express = require("express");
const router = express.Router();

module.exports = router;

const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryControllers");

router.post("/add", addCategory);
router.get("/get", getCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
