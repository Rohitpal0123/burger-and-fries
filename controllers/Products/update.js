const Product = require("../../models/product.model");

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
      const id = req.params.id;
      const update = req.body;

      this.productExists(id); //awaits

      const updateProduct = await Product.updateOne({ _id: id }, update);
      if (updateProduct.modifiedCount != 1) throw "Failed to update product !";

      res.status(200).json({ updateProduct });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new updateProduct();
