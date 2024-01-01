const Meal = require("../../models/meal.model");

class updateMeal {
  process = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;

      const updatedMeal = await Meal.updateOne({ _id: id }, update);
      if (updatedMeal.modifiedCount != 1) throw "Failed to update Meal!";

      res.status(200).json(updatedMeal);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new updateMeal();
