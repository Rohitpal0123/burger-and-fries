const app = require("../../../server");
const supertest = require("supertest");
const Order = require("../../../models/order.model");

let chai;
let expect;
let orderNumber;

describe("add new order POST /order/add", function () {
  this.timeout(10000);
  before(async function () {
    chai = await import("chai");
    expect = chai.expect;
  });

  it("should add new order", async function () {
    const newOrder = {
      email: "prohit9370@gmail.com",
      orders: [
        {
          productCode: "iced_caramel_macchiato",
          quantity: 5,
          instructions: "extra jalapeno, no ketchup and onion",
          isMeal: false,
        },
        {
          productCode: "garlic_parmesan_fries",
          quantity: 1,
          instructions: "extra jalapeno, no ketchup and onion",
          isMeal: false,
        },
        {
          mealCode: "lovely_meal",
          quantity: 3,
          instructions: "NA",
          isMeal: true,
        },
        {
          mealCode: "delicious_meal",
          quantity: 3,
          instructions: "NA",
          isMeal: true,
        },
      ],
      useCoins: false,
    };

    const res = await supertest(app)
      .post("/order/add")
      .set(
        "Cookie",
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjlmMjIzMzVmMTE5ZmVmMDExNzg3YyIsInJvbGUiOiI2NTYzYTQyZjMyZjhmODliNWQ5NGQxNjAiLCJpYXQiOjE3MDg3OTE1NzMsImV4cCI6MTcwODgxMzE3M30.8VPwfZZEeDecZdqcWrQYqJJEG8Cvq_KZN1GXl6MJ2f0",
      )
      .send(newOrder);

    orderNumber = res.body.data.orderNumber;
    expect(res.status).to.equal(200);

    const order = await Order.findOne({ orderNumber: orderNumber });
    expect(order).to.exist;
    expect(order.orderNumber).to.equal(orderNumber);
    expect(order.email).to.equal(newOrder.email);
  });

  after(async function () {
    await Order.deleteMany({ orderNumber: orderNumber });
  });
});
