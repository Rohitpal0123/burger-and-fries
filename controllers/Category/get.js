const Category = require("../../models/category.model");

class getCategory {
  process = async (req, res) => {
    try {
      const category = await Category.find();
      if (!category) throw "Category not found !";

      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getCategory();
