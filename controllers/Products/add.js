const Product = require("../../models/product.model");
const validate = require("../../lib/validate");
const addProductSchema = require("../../jsonSchema/Product/add");

class addProduct {
  process = async (req, res) => {
    try {
      validate(req.body, addProductSchema);

      const { name, category, foodType, price, description } = req.body;

      const newProduct = await Product.create({
        name,
        category,
        foodType,
        price,
        description
      });

      if (!newProduct) throw "Product not added !";

      res.status(200).json({ newProduct });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new addProduct();
