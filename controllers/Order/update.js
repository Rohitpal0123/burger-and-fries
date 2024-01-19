const Order = require("../../models/order.model");

class updateOrder {
  process = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;

      const updatedOrder = await Order.updateOne({ _id: id }, update);
      if (!updatedOrder.modifiedCount == 1) throw "Failed to update Order!";

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new updateOrder();
