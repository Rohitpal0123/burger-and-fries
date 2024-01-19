const Order = require("../../models/order.model");
const Meal = require("../../models/meal.model");
const Product = require("../../models/product.model");
const sendOrderConfirmationMail = require("../../lib/generateMail");

class addOrder {
  process = async (req, res) => {
    try {
      const { email, orders } = req.body;

      const items = [];

      let len = orders.length;
      for (let i = 0; i < len; i++) {
        let mealPrice = 0;
        let discount = 0;

        //Meal query
        if (orders[i].isMeal) {
          const newMeal = await Meal.find({ _id: orders[i].id });

          newMeal[0].products.forEach((product) => {
            mealPrice += product.price;
            discount += product.mealDiscount;
          });

          items.push({
            name: newMeal[0].mealName,
            quantity: orders[i].quantity,
            price: mealPrice,
            discount: discount,
            instructions: orders[i].instructions
          });
        } else {
          //Item query
          const newItem = await Product.find({ _id: orders[i].id });
          items.push({
            name: newItem[0].name,
            quantity: orders[i].quantity,
            price: newItem[0].price,
            discount: discount,
            instructions: orders[i].instructions
          });
        }
      }

      //Calculate total amount
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total +=
          (items[i].price - (items[i].discount / 100) * items[i].price) *
          items[i].quantity;
      }

      //Generate Order Number
      let orderNumber = Math.floor(Math.random() * 9000) + 1000;

      //Save order in database
      const newOrder = await Order.create({
        email: email,
        orderNumber,
        items,
        total
      });

      //Send Email Confirmation

      let now = new Date();
      let date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      let time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      // Calculate the total discount for the order
      let totalDiscount = 0;
      for (let i = 0; i < items.length; i++) {
        totalDiscount +=
          (items[i].discount / 100) * items[i].price * items[i].quantity;
      }

      // Create HTML content for the email
      const html = `
  <p><strong>OrderNumber:</strong> ${orderNumber}</p>
  <p><strong>Date:</strong> ${date}</p>
  <p><strong>Time:</strong> ${time}</p>
  
  <table border="1" style="width: 100%; border-collapse: collapse; background-color: #f2f2f2; text-align: center;">
    <thead style="background-color: #d9d9d9;">
      <tr>
        <th>Sr. No</th>
        <th>Items</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map(
          (item, index) => `
        <tr style="background-color: #ffffff;">
          <td style="text-align: center;">${index + 1}</td>
          <td>${item.name}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: center;">$${item.price.toFixed(2)}</td>
          <td style="text-align: center;">${item.discount}%</td>
          <td style="text-align: center;">$${(
            item.price * item.quantity -
            (item.discount / 100) * item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>`
        )
        .join("")}
    </tbody>
    <tfoot style="background-color: #d9d9d9; text-align: right;">
      <tr>
        <td colspan="5" align="right"><strong>Total</strong></td>
        <td style="text-align: center;"><strong>$${total.toFixed(
          2
        )}</strong></td>
      </tr>
    </tfoot>
  </table>
  
  <p><strong>Thank you for ordering at Burger and Fries.</strong></p>
  <p>Please visit us again!</p>
`;

      const mailDetails = {
        from: "service@bandf.com",
        to: email,
        subject: "Order Confirmed!",
        html: html
      };

      const orderConfirmationMail = await sendOrderConfirmationMail(
        mailDetails
      );
      res.status(200).json({ message: "Order Email Sent !", order: newOrder });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new addOrder();
