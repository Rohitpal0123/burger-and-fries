const Category = require("../../models/category.model");
const addCategorySchema = require("../../jsonSchema/Category/add");
const validate = require("../../lib/validate");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class addCategory {
  async categoryExists(category) {
    try {
      const categoryExists = await Category.findOne({ category: category });
      if (categoryExists) throw "Category aleady exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, addCategorySchema);
      const { category } = req.body;

      await this.categoryExists(category);

      const newCategory = await Category.create({ category: category });
      if (!newCategory) throw "Category not added !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: newCategory
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new addCategory();
