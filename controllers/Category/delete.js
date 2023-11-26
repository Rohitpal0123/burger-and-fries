const Category = require("../../models/category.model");

class deleteCategory {
  async categoryExists(id) {
    try {
      const categoryExists = await Category.findById({ _id: id });
      if (!categoryExists) throw "Category does not exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const id = req.params.id;

      await this.categoryExists(id);

      const deletedCategory = await Category.deleteOne({ _id: id });
      if (!deletedCategory) throw "Category not deleted !";

      res.status(200).json({ deletedCategory });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteCategory();
