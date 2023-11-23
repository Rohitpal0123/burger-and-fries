const Product = require("../../models/product.model");
const redis = require("redis").createClient();

class getAllProduct {
  process = async (req, res) => {
    try {
      let results;
      let isCached = false;
      const getFromRedis = (key) => {
        return new Promise((resolve, reject) => {
          redis.get(key, (err, reply) => {
            if (err) {
              reject(err);
            } else {
              resolve(reply);
            }
          });
        });
      };

      const cacheResult = await getFromRedis("products");
      console.log("🚀 ~ cacheResult:", cacheResult);

      if (cacheResult) {
        isCached = true;
        results = JSON.parse(cacheResult);
        console.log("🚀 ~ results:", results);
      } else {
        results = await Product.find();
        console.log("🚀 ~ results:", results);
        if (!results) throw "Products not found !";

        await redis.set("products", JSON.stringify(results));
      }

      res.status(200).json(results);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllProduct();
