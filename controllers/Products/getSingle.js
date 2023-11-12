const Product = require("../../models/product.model");

class getSingleProduct {
  process = async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.findOne({ _id: id });
      if (!product) throw "Product not found !";

      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getSingleProduct();
