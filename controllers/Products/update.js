const Product = require("../../models/product.model");
const validate = require("../../lib/validate");
const updateProductSchema = require("../../json-schema/Product/update");
class updateProduct {
  async productExists(id) {
    try {
      const productExists = await Product.findOne({ _id: id });
      if (!productExists) throw "Product doesn't exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, updateProductSchema);

      const id = req.params.id;
      const update = req.body;

      await this.productExists(id);

      const updateProduct = await Product.updateOne({ _id: id }, update);
      if (updateProduct.modifiedCount != 1) throw "Failed to update product !";

      res.status(200).json({ updateProduct });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new updateProduct();
