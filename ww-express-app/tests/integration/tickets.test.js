const chai = require("chai");
const chaiHttp = require("chai-http");
const ticketModel = require("../../models/ticketModel");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../../app");
const truckModel = require("../../models/truckModel");
const orderModel = require("../../models/orderModel");
let server;

/**
 * The route endpoints  are:
 *  in = /weigh/in/
 *  out =  /weigh/out/
 *  get onsite  = ticket/getall/
 *  get one onsite /ticket/getone/onsite/
 *  delete onsite = ticket/cancelonsite/
 */

const exampleTicketIn = {
  reg: "RR53TRK",
  tareWeight: 15000,
  clerk_Id: "test123",
  loadedLocation: "Camelot",
  order_Id: "ORDR55885588",
};

const openOrder = new orderModel({
  orderNumber: "ORDR55885588",
  company: "TEST123",
  dateStart: "05/01/2024",
  dateFinish: "",
  open: true,
  product: "Asphalt mix 1",
  quantity: 5000,
  amountDelivered: 10,
  deliveryAddress1: "XXX",
  deliveryAddress2: "XXX",
  deliveryTown: "XXX",
  deliveryPostCode: "XXXX",
  contactPhone: 447390796360,
  contactEmail: "XXXXXXX@email.com",
  truckRequired: "hotbox",
});

const truck = new truckModel({
  driverName: "Rocky Roads",
  email: "rocky.roads@email.com",
  reg: "RR53TRK",
  truckType: "hotbox",
  phone: 441986574056,
  maxGVW: 26000,
});

describe("Order Testing", async () => {
  before(async function () {
    server = app.listen(3012); //setup

    await openOrder.save();
    await truck.save();
  });

  after(async function () {
    server.close(); //teardown
  });

  it("should successfully create a weigh-in ticket", async () => {
    const exampleTicketIn = {
      reg: "RR53TRK",
      tareWeight: 15000,
      clerk_Id: "test123",
      loadedLocation: "Camelot",
      order_Id: "ORDR55885588",
    };

    const res = await chai
      .request(server)
      .post("/weigh/in")
      .send(exampleTicketIn);

    expect(res.body).to.have.property("message", "Weigh in Successful");
    expect(res).to.have.status(201);
    expect(res.body).to.have.property("message", "Weigh in Successful");
  });

  it("should inform that the truck driver was not found by reg", async () => {
    const exampleTicketIn = {
      reg: "WHOOPS",
      tareWeight: 15000,
      clerk_Id: "test123",
      loadedLocation: "Camelot",
      order_Id: "ORDR55885588",
    };

    const res = await chai
      .request(server)
      .post("/weigh/in")
      .send(exampleTicketIn);

    expect(res.body).to.have.property(
      "message",
      "Truck Driver not found with that reg."
    );
    expect(res).to.have.status(404);
  });

  it("should inform that the order number has no match", async () => {
    const exampleTicketIn = {
      reg: "RR53TRK",
      tareWeight: 15000,
      clerk_Id: "test123",
      loadedLocation: "Camelot",
      order_Id: "WHOOPS",
    };

    const res = await chai
      .request(server)
      .post("/weigh/in")
      .send(exampleTicketIn);

    expect(res.body).to.have.property("message", "Order was not found.");
    expect(res).to.have.status(404);
  });
});
