const Order = require("../../models/order.model");

class deleteOrder {
  process = async (req, res) => {
    try {
      const { id } = req.body;

      const deletedOrder = await Order.deleteMany({});
      if (!deletedOrder) throw "Order not deleted!";

      res.status(200).json(deletedOrder);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteOrder();
