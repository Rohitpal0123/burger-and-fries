const Customer = require("../../models/customer.model");

class registerCustomer {
  process = async (req, res) => {
    try {
      const { name, email } = req.body;

      const coins = 0;
      const newCustomer = await Customer.create({
        name,
        email,
        coins
      });

      res.status(200).json(newCustomer);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new registerCustomer();
