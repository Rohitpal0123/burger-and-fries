const app = require("../../../server");
const supertest = require("supertest");

let chai;
let expect;

describe("should login user POST /employee/login", function () {
  this.timeout(15000);
  before(async function () {
    chai = await import("chai");
    expect = chai.expect;
  });

  it("should login user", async function () {
    const userData = {
      email: "ej1905630411@gmail.com",
      password: "golu",
    };

    const res = await supertest(app).post("/employee/login").send(userData);

    expect(res.status).to.equal(200);
    expect(res.headers["set-cookie"]).to.exist;
  });
});
