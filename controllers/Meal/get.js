const Meal = require("../../models/meal.model");

class getMeal {
  process = async (req, res) => {
    try {
      const meals = await Meal.find();
      if (!meals) throw "Meal not found!";

      res.status(200).json(meals);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getMeal();
