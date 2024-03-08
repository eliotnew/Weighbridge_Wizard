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

describe("Tickets Testing", async () => {
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

  it("should successfully cancel an onsite truck by reg", async () => {
    const res = await chai
      .request(server)
      .delete("/ticket/cancelonsite")
      .query({ reg: "RR53TRK" });

    expect(res).to.have.status(204);

    const deletedTicket = await ticketModel.findOne({
      reg: "TEST123",
      onSite: true,
    });
    expect(deletedTicket).to.be.null;
  });

  it("should inform user that no match was found", async () => {
    const res = await chai
      .request(server)
      .delete("/ticket/cancelonsite")
      .query({ reg: "Whoops!" });

    expect(res).to.have.status(404);
  });

  it("should inform user that reg was given", async () => {
    const res = await chai.request(server).delete("/ticket/cancelonsite");

    expect(res).to.have.status(400);
  });

  it("should get all tickets but return empty  ", async () => {
    const res = await chai.request(server).get("/ticket/getall");

    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message", "No tickets found");
  });

  it("should return all tickets  ", async () => {
    const exampleTicketIn = {
      reg: "RR53TRK",
      tareWeight: 15000,
      clerk_Id: "test123",
      loadedLocation: "Camelot",
      order_Id: "ORDR55885588",
    };

    const res1 = await chai
      .request(server)
      .post("/weigh/in")
      .send(exampleTicketIn);

    expect(res1.body).to.have.property("message", "Weigh in Successful");
    expect(res1).to.have.status(201);
    expect(res1.body).to.have.property("message", "Weigh in Successful");

    const res2 = await chai.request(server).get("/ticket/getall");

    expect(res2).to.have.status(200);
    expect(res2.body).to.be.an("array");
    expect(res2.body.length).to.be.greaterThan(0);
  });

  it("should return one onsite tickets  ", async () => {
    const res = await chai.request(app).get("/ticket/getone/onsite/RR53TRK");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.reg).to.equal("RR53TRK");
    expect(res.body.onSite).to.be.true;
  });

  it("should return one onsite ticket  ", async () => {
    const res = await chai.request(app).get("/ticket/getone/onsite/RR53TRK");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.reg).to.equal("RR53TRK");
    expect(res.body.onSite).to.be.true;
  });
});
