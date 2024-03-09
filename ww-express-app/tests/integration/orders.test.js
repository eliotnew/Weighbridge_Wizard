const chai = require("chai");
const chaiHttp = require("chai-http");
const orderModel = require("../../models/orderModel");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../../app");
let server;

const exampleOrder = {
  company: "WizardCompany",
  product: "Limestone 6mm",
  quantity: 80000,
  deliveryAddress1: "address1",
  deliveryAddress2: "address2",
  deliveryTown: "town1",
  deliveryPostCode: "TWN111",
  contactPhone: "03746528767",
  contactEmail: "email@email.com",
};

/**
 * The route endpoints  are:
 *  Create = "/order/create"
 *  Close = "/order/close"
 *  get closed = "/order/getclosed"
 *  get open = "/order/getopen"
 *  get compatible = "/order/getcompatible"
 */

describe("Order Testing", async () => {
  before(async function () {
    server = app.listen(3012); //setup
  });

  after(async function () {
    server.close(); //teardown
  });

  beforeEach(async () => {
    try {
      await orderModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  });

  it("should successfully create an order using the exampleOrder", async () => {
    const res = await chai
      .request(server)
      .post("/order/create")
      .send(exampleOrder);

    expect(res).to.have.status(201);

    expect(res.body).to.have.property("message", "Order Created Successfully");
  });

  it("should reject a false input for an non existing product.", async () => {
    const exampleOrderWrongProd = {
      company: "WizardCompany",
      product: "CrystalBall",
      quantity: 80000,
      deliveryAddress1: "address1",
      deliveryAddress2: "address2",
      deliveryTown: "town1",
      deliveryPostCode: "TWN111",
      contactPhone: "03746528767",
      contactEmail: "email@email.com",
    };

    const res = await chai
      .request(server)
      .post("/order/create")
      .send(exampleOrderWrongProd);

    expect(res).to.have.status(404);
  });

  it("should create an example order and verify it exists among open orders and be an array", async () => {
    // Step 1: arrange
    let res = await chai
      .request(server)
      .post("/order/create")
      .send(exampleOrder);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("message", "Order Created Successfully");

    // Step 2: act
    res = await chai.request(server).get("/order/getopen");

    // Step 3: assert
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");

    const orderCompanyExists = res.body.some(
      (order) => order.company === exampleOrder.company
    );
    expect(orderCompanyExists).to.be.true;
  });

  it("should successfully close the created order", async () => {
    // Step 1: arrange
    let res = await chai
      .request(server)
      .post("/order/create")
      .send(exampleOrder);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("message", "Order Created Successfully");

    res = await chai.request(server).get("/order/getopen");

    const orderNumber = res.body[0]?.orderNumber;

    console.log("-----------------------" + orderNumber);

    // Step 2: act  close the created order
    const closeRes = await chai
      .request(server)
      .put("/order/close")
      .send({ orderNumber: orderNumber });

    expect(closeRes).to.have.status(200);
    expect(closeRes.body).to.have.property("message", "Closed Order");
  });

  it("should successfully get closed orders", async () => {
    // Step 1: arrange
    let res = await chai
      .request(server)
      .post("/order/create")
      .send(exampleOrder);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("message", "Order Created Successfully");

    res = await chai.request(server).get("/order/getopen");

    let orderNumber = res.body[0]?.orderNumber;

    console.log("-----------------------" + orderNumber);

    const closeRes = await chai
      .request(server)
      .put("/order/close")
      .send({ orderNumber: orderNumber });

    expect(closeRes).to.have.status(200);
    expect(closeRes.body).to.have.property("message", "Closed Order");

    // Step 2: getclosed orders

    const closedArrayRes = await chai.request(server).get("/order/getclosed");

    //assert
    expect(closedArrayRes).to.have.status(200);
    expect(closedArrayRes.body).to.be.an("array");
    let closedOrderNumber = closedArrayRes.body[0]?.orderNumber;
    expect(closedOrderNumber).to.equal(orderNumber);
  });

  it("should correctly inform the client that the order number was not found when closing order", async () => {
    // Step 2: act  close the created order
    const closeRes = await chai
      .request(server)
      .put("/order/close")
      .send({ orderNumber: "ORDR0000000" });

    expect(closeRes).to.have.status(404);
    expect(closeRes.body).to.have.property(
      "message",
      "The order does not exist on the db."
    );
  });

  it("should correctly inform the client that there are no open orders that match the truck type", async () => {
    // Step 2: act  close the created order
    const closeRes = await chai
      .request(server)
      .get("/order/getcompatible")
      .query({ compatible: "hotbox" });

    expect(closeRes).to.have.status(404);
    expect(closeRes.body).to.have.property(
      "message",
      "No orders for this truck type (hotbox)are currently available."
    );
  });

  it("should successfully inform the client that there is a compatible order by trucktype", async () => {
    const res = await chai
      .request(server)
      .post("/order/create")
      .send(exampleOrder);

    expect(res).to.have.status(201);

    expect(res.body).to.have.property("message", "Order Created Successfully");

    // Step 2: act  close the created order
    const closeRes = await chai
      .request(server)
      .get("/order/getcompatible")
      .query({ compatible: "dump" });

    expect(closeRes).to.have.status(200);
  });
});
