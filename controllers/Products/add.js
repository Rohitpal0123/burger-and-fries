const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const validate = require("../../lib/validate");
const productSchema = require("../../jsonSchema/Product/productSchema");

class addProduct {
  process = async (req, res) => {
    try {
      validate(req.body, productSchema);

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
