const Product = require("../models/product.model");

// @desc add new product
// @route POST/product/add

const addProduct = async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const foodType = req.body.foodType;
  const price = req.body.price;
  const description = req.body.description;

  const newProduct = new Product({
    name,
    category,
    foodType,
    price,
    description
  });

  newProduct
    .save()
    .then(() => res.json("Product added !!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

//@desc get all product details
//@route GET/product/get
const getProducts = async (req, res) => {
  Product.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
};

//@desc get specific product details
//@route GET/product/get/id
const getProduct = async (req, res) => {
  const id = req.params.id;

  Product.find({ _id: id })
    .then((product) => res.json(product))
    .catch((err) => res.status(404).json(err));
};

//@desc update product details
//@route DELETE/product/delete
const deleteProduct = async (req, res) => {
  try {
    const id = req.body.id;
    const response = await Product.deleteOne({ _id: id });
    if (response.deletedCount == 0) {
      throw "Failed to delete";
    }
    console.log("response", response);
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json("Error: " + error);
  }
};

//@desc update product details
//@route UPDATE/product/id

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Product.updateOne({ _id: id }, update)
    .then((data) => {
      console.log("data:: ", data);
      res.json("Product updated !!");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
};
