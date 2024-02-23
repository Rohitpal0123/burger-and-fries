const app = require("../../../server");
const supertest = require("supertest");
const Product = require("../../../models/product.model");

let chai;
let expect;
describe("add new Product POST /product/add", function () {
  this.timeout(10000);
  before(async function () {
    chai = await import("chai");
    expect = chai.expect;
  });

  it("should add new product", async function () {
    const productData = {
      name: "Chicken whopper Burger",
      productCode: "chicken_whopper_burger",
      category: "burger",
      foodType: "non-veg",
      price: 20,
      mealDiscount: 10,
      description:
        "Juicy chicken patty with fresh lettuce, creamy mayonnaise, and a soft corn dusted bun.",
    };

    const res = await supertest(app)
      .post("/product/add")
      .set(
        "Cookie",
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjlmMjIzMzVmMTE5ZmVmMDExNzg3YyIsInJvbGUiOiI2NTYzYTQyZjMyZjhmODliNWQ5NGQxNjAiLCJpYXQiOjE3MDg3MTA3ODQsImV4cCI6MTcwODczMjM4NH0.ZgQUsnVN9STk4KdpeIDSOpTLC_Phi2jb2h9KJgDJU0Y"
      )
      .send(productData);

    expect(res.status).to.equal(200);

    const product = await Product.findOne({
      productCode: productData.productCode,
    });

    expect(product).to.exist;
    expect(product.name).to.equal(productData.name);
    expect(product.productCode).to.equal(productData.productCode);
  });

  after(async function () {
    await Product.deleteMany({ productCode: "chicken_whopper_burger" });
  });
});
