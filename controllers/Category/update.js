const Category = require("../../models/category.model");
const validate = require("../../lib/validate");
const updateCategorySchema = require("../../jsonSchema/Category/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
class updateCategory {
  async categoryExists(id) {
    try {
      const categoryExists = await Category.find({ _id: id });
      if (categoryExists == null) throw "Category not found !";

      return null;
    } catch (error) {
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
      if (updatedCategory.modifiedCount != 1) throw "Category not Updated !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: updatedCategory
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new updateCategory();
