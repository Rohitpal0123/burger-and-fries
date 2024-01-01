const Order = require("../../models/order.model");

class updateOrder {
  process = async (req, res) => {
    try {
      const id = req.params.id;
      console.log("🚀 ~ id:", id);
      const update = req.body;
      console.log("🚀 ~ update:", update);

      const updatedOrder = await Order.updateOne({ _id: id }, update);
      console.log("🚀 ~ updatedOrder:", updatedOrder);
      if (!updatedOrder.modifiedCount == 1) throw "Failed to update Order!";

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new updateOrder();
