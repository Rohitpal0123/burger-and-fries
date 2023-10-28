const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    console.log("🚀 ~ category:", category);

    const newCategory = await Category.create({ category });
    console.log("🚀 ~ newCategory:", newCategory);

    res.status(200).json({ newCategory });
  } catch (error) {
    console.log("🚀 ~ error:", error);

    res.status(400).json(error);
  }
};

const getCategory = async (req, res) => {
  try {
    let isCategory = await Category.find();
    console.log("🚀 ~ category:", isCategory);

    if (isCategory == null) throw " No category available";

    res.status(200).json({ isCategory });
  } catch (error) {
    console.log("🚀 ~ error:", error);

    res.status(400).json(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.body;

    let isCategory = await Category.find({ _id: id });
    console.log("🚀 ~ response:", isCategory);
    if (isCategory == null) throw "Category does not exist :(";

    let newUpdate = await Category.updateOne({ _id: id }, category);
    console.log("🚀 ~ newUpdate:", newUpdate);
    if (newUpdate.modifiedCount != 1) throw "Category couldn't be updated :(";

    res.status(400).json({ newUpdate });
  } catch (error) {
    console.log("🚀 ~ error:", error);

    res.status(400).json(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    let isCategory = await Category.findOne({ _id: id });
    if (!isCategory) throw "Category does not exist!";

    let deletedCategory = await Category.deleteOne({ _id: id });
    if (deletedCategory.deletedCount != 1) throw "Category not deleted!";

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
