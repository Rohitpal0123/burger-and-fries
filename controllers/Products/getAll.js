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

      if (cacheResult) {
        isCached = true;
        results = JSON.parse(cacheResult);
      } else {
        results = await Product.find();

        if (!results) throw "Products not found !";

        await redis.set("products", JSON.stringify(results));
      }

      res.status(200).json(results);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllProduct();
