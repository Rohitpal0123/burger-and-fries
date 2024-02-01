const Meal = require("../../models/meal.model");
const Product = require("../../models/product.model");

class addMeal {
  process = async (req, res) => {
    try {
      const { mealNumber, mealName, mealCode, products } = req.body;

      for (let i = 0; i < products.length; i++) {
        const productCode = products[i];
        const product = await Product.findOne({ productCode: productCode });
        products[i] = product;
      }

      let price = 0;
      products.forEach((product) => {
        price += product.price;
      });

      const newMeal = await Meal.create({
        mealNumber,
        mealName,
        mealCode,
        products,
        price,
      });
      if (!newMeal) throw "Meal not created!";

      res.status(200).json(newMeal);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}
module.exports = new addMeal();
