const Product = require("../../models/product.model");
const redisClient = require("../../server");

class getAllProduct {
  process = async (req, res) => {
    try {
      const isCached = false;
      const cacheResult = await redisClient.get("products");
      console.log("🚀 ~ cacheResult:", cacheResult);
      if (cacheResult) {
        isCached = true;
        const products = JSON.parse(cacheResult);
        console.log("🚀 ~ products:", products);
      } else {
        const products = await Product.find();
        console.log("🚀 ~ product:", products);
        if (!products) throw "Products not found !";

        await redisClient.set(products, JSON.stringify(products), {
          EX: 30,
          NX: true
        });
      }

      res.status(200).json(products);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllProduct();
