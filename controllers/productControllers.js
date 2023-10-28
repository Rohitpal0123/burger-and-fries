const Product = require("../models/product.model");

// @desc add new product
// @route POST/product/add

const addProduct = async (req, res) => {
  try {
    const { name, category, foodType, price, description } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      foodType,
      price,
      description
    });
    console.log("🚀 ~ newProduct", newProduct);
    if (!newProduct) throw "Product not added !";

    res.status(200).json({ newProduct });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};

//@desc get all product details
//@route GET/product/get
const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    console.log("🚀 ~ product:", product);
    if (product == null) throw "No Product available";

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(error);
  }
};

//@desc get specific product details
//@route GET/product/get/id
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    console.log("🚀 ~ product:", product);
    if (!product) throw "Product not available";

    res.status(200).json({ product });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};

//@desc update product details
//@route UPDATE/product/id
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    let product = await Product.findOne({ _id: id });
    if (!product) throw "Product doesn't exists";

    let updateProduct = await Product.updateOne({ _id: id }, update);
    if (updateProduct.modifiedCount != 1) throw "Failed to update product";

    res.status(200).json({ updateProduct });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

//@desc delete product details
//@route DELETE/product/delete
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Product.findOne({ _id: id });
    console.log("🚀 ~ response:", response);
    if (!response) throw "Product does not exist !";

    const deletedProduct = await Product.deleteOne({ _id: id });
    console.log("🚀 ~ deletedProduct:", deletedProduct);
    if (deletedProduct.deletedCount != 1) throw "Product not deleted !";

    res.status(200).json({ deletedProduct });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
};
