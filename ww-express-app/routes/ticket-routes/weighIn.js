const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
const truckModel = require("../../models/truckModel");
const orderModel = require("../../models/orderModel");
const getTime = require("../../functions/getTime");
const getDate = require("../../functions/getDate");

/**
 * Weigh in creates a ticket which will be half completed.
 */

router.post("/", async (req, res) => {
  const {
    reg,
    tareWeight,
    clerk_Id, //ls
    loadedLocation, //ls
    order_Id,
  } = req.body;

  console.log("Recieved a weigh in request with reg:", reg);

  const onsite = true;
  const empty = "";

  const timeNow = getTime();
  const dateNow = getDate();

  const truck = await truckModel.findOne({ reg: reg });
  const driverName = truck.driverName;
  console.log("Fetched the drivers name: " + driverName);

  const order = await orderModel.findOne({ orderNumber: order_Id });
  const product = order.product;
  console.log("Fetched the order's product: " + driverName);

  const ticket = new ticketModel({
    driverName: driverName,
    reg: reg,
    product: product,
    tareWeight: tareWeight,
    //outWeight: empty,
    //netWeight: empty,
    clerk_Id: clerk_Id,
    loadedLocation: loadedLocation,
    order_Id: order_Id,
    timeIn: timeNow,
    //timeOut: empty,
    date: dateNow,
    onSite: onsite,
  });
  try {
    await ticket.save();
    res.status(201).json({ message: "Weigh in Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
