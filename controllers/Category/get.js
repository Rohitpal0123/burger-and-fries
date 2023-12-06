const Category = require("../../models/category.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class getCategory {
  process = async (req, res) => {
    try {
      const category = await Category.find();
      if (!category) throw "Category not found !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: category
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new getCategory();
