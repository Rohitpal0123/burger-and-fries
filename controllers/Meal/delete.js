const Meal = require("../../models/meal.model");

class deleteMeal {
  process = async (req, res) => {
    try {
      const { id } = req.body;

      const deletedMeal = await Meal.deleteOne({ _id: id });
      if (!deletedMeal) throw "Meal not deleted!";

      res.status(200).json(deletedMeal);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteMeal();
