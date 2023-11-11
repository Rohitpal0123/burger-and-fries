// const Product = require("../models/product.model");
// const Category = require("../models/category.model");
// const validate = require("../lib/validate");
// const productSchema = require("../jsonSchema/Product/productSchema");

// @desc add new product
// @route POST/product/add
// const addProduct = async (req, res) => {
//   try {
//     validate(req.body, productSchema);
//     const { name, category, foodType, price, description } = req.body;
//     const isCategory = await Category.findOne({ _id: category });
//     if (isCategory == null) throw "Category not found !";

//     const newProduct = await Product.create({
//       name,
//       category,
//       foodType,
//       price,
//       description
//     });

//     if (!newProduct) throw "Product not added !";

//     res.status(200).json({ newProduct });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

//@desc get all product details
//@route GET/product/get
// const getProducts = async (req, res) => {
//   try {
//     const page = req.query.page;
//     const limit = req.query.limit;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// //@desc get specific product details
// //@route GET/product/get/id
// const getProduct = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const product = await Product.findOne({ _id: id });
//     if (!product) throw "Product not found !";

//     res.status(200).json({ product });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

//@desc update product details
//@route UPDATE/product/id
// const updateProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const update = req.body;

//     let product = await Product.findOne({ _id: id });
//     if (!product) throw "Product doesn't exists !";

//     let updateProduct = await Product.updateOne({ _id: id }, update);
//     if (updateProduct.modifiedCount != 1) throw "Failed to update product !";

//     res.status(200).json({ updateProduct });
//   } catch (error) {
//     res.status(404).json({ error: error });
//   }
// };

//@desc delete product details
//@route DELETE/product/delete
// const deleteProduct = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const response = await Product.findOne({ _id: id });
//     if (!response) throw "Product doesn't exist !";

//     const deletedProduct = await Product.deleteOne({ _id: id });
//     if (deletedProduct.deletedCount != 1) throw "Product not deleted !";

//     res.status(200).json({ deletedProduct });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports = {
//   addProduct,
//   getProducts,
//   getProduct,
//   deleteProduct,
//   updateProduct
// };
