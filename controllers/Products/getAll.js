const Product = require("../../models/product.model");

class getAllProduct {
  process = async (req, res) => {
    try {
      const page = req.query.page;
      console.log("🚀 ~ page:", page);
      const limit = req.query.limit;
      console.log("🚀 ~ limit:", limit);

      const product = await Product.find()
        .skip(page * limit)
        .limit(limit);
      console.log("🚀 ~ product:", product);
      if (!product) throw "Products not found !";

      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllProduct();
