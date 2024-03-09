const chai = require("chai");
const chaiHttp = require("chai-http");
const productModel = require("../../models/productModel");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../../app");
let server;

describe("Order Testing", async () => {
  before(async function () {
    server = app.listen(3012); //setup
  });

  after(async function () {
    server.close(); //teardown
  });

  it("should successfully get products", async () => {
    const getProductsRes = await chai.request(server).get("/products/getall");

    expect(getProductsRes).to.have.status(200);
  });

  it("should correctly inform the client that there are no products", async () => {
    try {
      await productModel.deleteMany({});
    } catch (error) {
      throw error;
    }

    const getProductsRes = await chai.request(server).get("/products/getall");

    expect(getProductsRes).to.have.status(404);
  });
});
