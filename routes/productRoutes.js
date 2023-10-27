const express = require("express");
const router = express.Router();

module.exports = router;

const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productControllers");

router.post("/add", addProduct);
router.get("/get", getProduct);
router.delete("/delete", deleteProduct);
router.post("/update/:id", updateProduct);
