const express = require("express");
const router = express.Router();

module.exports = router;

const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productControllers");

router.post("/add", addProduct);
router.get("/get", getProducts);
router.get("/get/:id", getProduct);
router.delete("/delete", deleteProduct);
router.post("/update/:id", updateProduct);
