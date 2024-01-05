const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    orderNumber: {
      type: Number,
      required: true
    },
    products: {
      type: Object,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

Order = mongoose.model("Order", orderSchema);
module.exports = Order;
