const Order = require("../../models/order.model");

class addOrder {
  process = async (req, res) => {
    try {
      const { email, orderNumber, products, totalAmount } = req.body;
      console.log("🚀 ~ products:", products);

      const newOrder = await Order.create({
        email,
        orderNumber,
        products,
        totalAmount
      });
      console.log("🚀 ~ newOrder:", newOrder);
      if (!newOrder) throw "Order not created!";

      res.status(200).json(newOrder);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new addOrder();
