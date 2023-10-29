const Category = require("../models/category.model");

// @desc add new catgory
// @route POST/category/add
const addCategory = async (req, res) => {
  try {
    const { category } = req.body; //no destructuring

    const newCategory = await Category.create({ category });
    if (!newCategory) throw "Category not created !";

    res.status(200).json({ newCategory });
  } catch (error) {
    res.status(400).json(error);
  }
};

// @desc get categories detail
// @route GET/category/get
const getCategory = async (req, res) => {
  try {
    let isCategory = await Category.find();
    if (!isCategory) throw "Category not found";

    res.status(200).json({ isCategory });
  } catch (error) {
    res.status(400).json(error);
  }
};

// @desc update existing category
// @route UPDATE/category/update/:id
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.body;

    let isCategory = await Category.find({ _id: id });
    if (isCategory == null) throw "Category not found !";

    let newUpdate = await Category.updateOne({ _id: id }, category);
    if (newUpdate.modifiedCount != 1) throw "Failed to update category";

    res.status(400).json({ newUpdate });
  } catch (error) {
    res.status(400).json(error);
  }
};

// @desc delete existing category
// @route DELETE/category/delete/:id
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    let isCategory = await Category.findOne({ _id: id });
    if (!isCategory) throw "Category doesn't exists !";

    let deletedCategory = await Category.deleteOne({ _id: id });
    if (deletedCategory.deletedCount != 1) throw "Failed to delete category !";

    res.status(200).json({ deletedCategory });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
};
