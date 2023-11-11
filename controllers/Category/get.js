const Category = require("../../models/category.model");

class getCategory {
  process = async (req, res) => {
    try {
      const category = Category.find();
      if (!category) throw "Category not found !";

      res.status(200).json({ category });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getCategory();
