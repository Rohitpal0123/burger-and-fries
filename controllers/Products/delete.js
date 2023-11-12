const Product = require("../../models/product.model");

class deleteProduct {
  async productExists(id) {
    try {
      const productExists = await Product.findOne({ _id: id });
      if (!productExists) throw "Product doesn't exist !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const id = req.params.id;

      await this.productExists(id);

      const deletedProduct = await Product.deleteOne({ _id: id });
      if (deletedProduct.deletedCount != 1) throw "Product not deleted !";

      res.status(200).json({ deletedProduct });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteProduct();
