const Product = require("../../models/product.model");

class getAllProduct {
  async indexCalculation(page, limit) {
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      return startIndex, endIndex;
    } catch (error) {
      throw error;
    }
  }

  process = async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;

      const { startIndex, endIndex } = this.indexCalculation(page, limit); // altenate

      const product = await Product.find();
      if (!product) throw "Products not found !";

      const resultProduct = product.slice(startIndex, endIndex);

      res.status(200).json({ resultProduct });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllProduct();
