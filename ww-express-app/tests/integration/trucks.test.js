const chai = require("chai");
const chaiHttp = require("chai-http");
const truckModel = require("../../models/truckModel");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../../app");
let server;

/**
 * The route endpoints  are:
 *  Create = "/truck/create"
 *  Delete = "/truck/delete"
 *  get  = "/truck/get"
 *  update = "/truck/update" // I dont think this is used in my app
 *  getAll = "/trucks/getall"
 *  confirm = "/trucks/confirm"
 *
 */

const exampleTruck = {
  driverName: "Merlin",
  email: "merlin@outlook.co.uk",
  reg: "SP3LL C4STR",
  truckType: "hotbox",
  phone: 42865329782,
  maxGVW: 42000,
};

describe("Trucks Testing", async () => {
  before(async function () {
    server = app.listen(3012); //setup
  });

  after(async function () {
    server.close(); //teardown
  });

  it("should successfully create a truck using the exampleTruck", async () => {
    let res = await chai
      .request(server)
      .post("/truck/create")
      .send(exampleTruck);

    expect(res).to.have.status(201);
  });

  it("should correctly inform the user that the truck already exists", async () => {
    let res = await chai
      .request(server)
      .post("/truck/create")
      .send(exampleTruck);

    expect(res).to.have.status(409);
  });

  it("should successfully find the truck by reg", async () => {
    const regFind1 = {
      reg: "SP3LL C4STR",
    };
    let res = await chai.request(server).get(`/truck/get/${regFind1.reg}`);

    expect(res).to.have.status(200);
  });

  it("should correctly inform the user that the truck was not found", async () => {
    const regFindWrong = {
      reg: "Whoops!",
    };
    let res = await chai.request(server).get(`/truck/get/${regFindWrong.reg}`);

    expect(res).to.have.status(404);
  });

  it("should successfully return all trucks when trucks exist", async () => {
    const res = await chai.request(server).get("/trucks/getall");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);

    const truckData = res.body[4]; //assumes that the function to populate the db is still in place.
    expect(truckData.driverName).to.equal(exampleTruck.driverName);
    expect(truckData.email).to.equal(exampleTruck.email);
    expect(truckData.reg).to.equal(exampleTruck.reg);
    expect(truckData.truckType).to.equal(exampleTruck.truckType);
    expect(truckData.phone).to.equal(exampleTruck.phone);
    expect(truckData.maxGVW).to.equal(exampleTruck.maxGVW);
  });

  it("should expect Merlin's truck to be a hotbox", async () => {
    const res = await chai
      .request(server)
      .get(`/trucks/confirm/${exampleTruck.reg}`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.include({
      exists: true,
      truckType: "hotbox",
    });
  });

  it("should inform the user if a truck does not exist in the database", async () => {
    const res = await chai.request(server).get(`/trucks/confirm/WHOOPS}`);

    expect(res).to.have.status(404);
    expect(res.body).to.deep.include({
      message: "The truck does not exist on the db.",
      exists: false,
    });
  });

  it("should successfully update Merlin's phone number", async () => {
    const updateRes = await chai.request(server).put("/truck/update").send({
      reg: "SP3LL C4STR",
      driverName: "Merlin",
      email: "merlin@outlook.co.uk",
      truckType: "hotbox",
      phone: 123456789, // This is a new phone number
      maxGVW: 42000,
    });

    expect(updateRes).to.have.status(200);
    expect(updateRes.body).to.have.property(
      "message",
      "Truck updated successfully"
    );

    const truckRes = await chai
      .request(server)
      .get(`/truck/get/${"SP3LL C4STR"}`);
    expect(truckRes.body.truckType).to.equal("hotbox"); // Check for Merlin's truck type to ensure correct truck is fetched
    expect(truckRes.body.phone).to.equal(123456789);
  });

  it("should successfully delete a truck by reg", async () => {
    const res = await chai
      .request(server)
      .delete(`/truck/delete/${exampleTruck.reg}`);

    expect(res).to.have.status(204);

    const deletedTruck = await truckModel.findOne({ reg: exampleTruck.reg });
    expect(deletedTruck).to.be.null;
  });

  it("should inform the user that the truck does not exist when attempting to delete a non-existent truck", async () => {
    const res = await chai.request(server).delete("/truck/delete/WHOOPS");

    expect(res).to.have.status(404);
    expect(res.body).to.have.property(
      "message",
      "The truck does not exist on the db."
    );
  });
});
