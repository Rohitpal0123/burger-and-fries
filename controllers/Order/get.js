const Order = require("../../models/order.model");

class getOrder {
  process = async (req, res) => {
    try {
      const orders = await Order.find();
      if (!orders) throw "Order not found!";

      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new getOrder();
