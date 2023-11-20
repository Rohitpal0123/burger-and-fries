const Product = require("../../models/product.model");
const redisClient = require("../../server");

class getAllProduct {
  process = async (req, res) => {
    try {
      const isCached = false;
      const cacheResult = await redisClient.get(products)
      if (cacheResult) {
        isCached = true;
        products = JSON.parse(cacheResult)
      } else {
        const product = await Product.find();
      console.log("🚀 ~ product:", product);
      if (!product) throw "Products not found !";
      }
      

      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllProduct();
