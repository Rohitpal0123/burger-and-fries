// const Product = require("../../models/product.model");
// const redisClient = require("../../server");
// const RESPONSE_MESSAGE = require("../../lib/responseCode");

// class getAllProduct {
//   process = async (req, res) => {
//     try {
//       let results;
//       let isCached = false;
//       const getFromRedis = (key) => {
//         return new Promise((resolve, reject) => {
//           redisClient.get(key, (err, reply) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(reply);
//             }
//           });
//         });
//       };

//       const cacheResult = await getFromRedis("products");

//       if (cacheResult) {
//         isCached = true;
//         results = JSON.parse(cacheResult);
//       } else {
//         results = await Product.find();

//         if (!results) throw "Products not found !";

//         await redisClient.set("products", JSON.stringify(results));
//       }

//       res.status(200).send({
//         type: RESPONSE_MESSAGE.SUCCESS,
//         data: results
//       });
//     } catch (error) {
//       res.status(400).send({
//         type: RESPONSE_MESSAGE.FAILED,
//         error: error.message
//       });
//     }
//   };
// }

// module.exports = new getAllProduct();
