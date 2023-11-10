const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/authMiddleware");
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productControllers");

router.post("/add", userAuthentication, addProduct);
router.get("/get", userAuthentication, getProducts);
router.get("/get/:id", userAuthentication, getProduct);
router.delete("/delete/:id", userAuthentication, deleteProduct);
router.put("/update/:id", userAuthentication, updateProduct);

module.exports = router;
