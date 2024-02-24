const app = require("../../../server");
const supertest = require("supertest");
const Meal = require("../../../models/meal.model");

let chai;
let expect;
describe("add new Meal POST /meal/add", function () {
  this.timeout(10000);
  before(async function () {
    chai = await import("chai");
    expect = chai.expect;
  });
  it("should add new meal", async function () {
    const mealData = {
      mealNumber: 4,
      mealName: "chinese",
      mealCode: "chinese",
      products: ["bacon_bbq_burger", "garlic_parmesan_fries"],
    };
    const res = await supertest(app)
      .post("/meal/add")
      .set(
        "Cookie",
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjlmMjIzMzVmMTE5ZmVmMDExNzg3YyIsInJvbGUiOiI2NTYzYTQyZjMyZjhmODliNWQ5NGQxNjAiLCJpYXQiOjE3MDg3OTE1NzMsImV4cCI6MTcwODgxMzE3M30.8VPwfZZEeDecZdqcWrQYqJJEG8Cvq_KZN1GXl6MJ2f0",
      )
      .send(mealData);

    expect(res.status).to.equal(200);

    const meal = await Meal.findOne({ mealCode: mealData.mealCode });
    expect(meal).to.exist;
    expect(meal.mealName).to.equal(mealData.mealName);
    expect(meal.mealCode).to.equal(mealData.mealCode);
  });

  after(async function () {
    await Meal.deleteOne({ mealCode: "chinese" });
  });
});
