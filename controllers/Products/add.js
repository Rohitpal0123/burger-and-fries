const Product = require("../../models/product.model");
const validate = require("../../lib/validate");
const addProductSchema = require("../../jsonSchema/Product/add");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class addProduct {
  process = async (req, res) => {
    try {
      validate(req.body, addProductSchema);
      const productData = req.body;

      const newProduct = await Product.create(productData);

      if (!newProduct) throw "Product not added !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: newProduct
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new addProduct();
