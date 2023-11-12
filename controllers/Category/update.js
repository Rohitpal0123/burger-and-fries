const Category = require("../../models/category.model");
const validate = require("../../lib/validate");
const updateCategorySchema = require("../../jsonSchema/Category/update");
class updateCategory {
  async categoryExists(id) {
    try {
      const categoryExists = await Category.find({ _id: id });
      console.log("🚀 ~ categoryExists:", categoryExists);
      if (categoryExists == null) throw "Category not found !";

      return null;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, updateCategorySchema);
      const id = req.params.id;
      const category = req.body;

      await this.categoryExists(id);

      const updatedCategory = await Category.updateOne({ _id: id }, category);
      console.log("🚀 ~ updatedCategory:", updatedCategory);
      if (updatedCategory.modifiedCount != 1) throw "Category not Updated !";

      res.status(200).json({ updatedCategory });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new updateCategory();
