const Category = require("../../models/category.model");

class addCategory {
  async categoryExists(category) {
    try {
      const categoryExists = await Category.findOne({ category: category });
      console.log("🚀 ~ categoryExists:", categoryExists);
      if (categoryExists) throw "Category aleady exists !";

      return null;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const { category } = req.body;

      await this.categoryExists(category);

      const newCategory = await Category.create({ category: category });
      console.log("🚀 ~ newCategory:", newCategory);
      if (!newCategory) throw "Category not added !";

      res.status(200).json({ newCategory });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new addCategory();
