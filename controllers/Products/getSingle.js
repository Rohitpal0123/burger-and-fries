const Product = require("../../models/product.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class getSingleProduct {
  process = async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.findOne({ _id: id });
      if (!product) throw "Product not found !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: product
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new getSingleProduct();
