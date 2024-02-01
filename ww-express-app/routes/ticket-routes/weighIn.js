const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
const getTime = require("../../functions/getTime");
const getDate = require("../../functions/getDate");

/**
 * Weigh in creates a ticket which will be half completed.
 */

router.post("/", async (req, res) => {
  const {
    driverName,
    reg,
    product,
    tareWeight,
    clerk_Id,
    loadedLocation,
    order_Id,
  } = req.body;

  console.log("Recieved a weigh in request with reg:", reg);

  const empty = "";
  const onsite = true;

  const timeNow = getTime();
  const dateNow = getDate();

  const ticket = new ticketModel({
    driverName: driverName,
    reg: reg,
    product: product,
    tareWeight: tareWeight,
    netWeight: empty,
    clerk_Id: clerk_Id,
    loadedLocation: loadedLocation,
    order_Id: order_Id,
    timeIn: timeNow,
    timeOut: empty,
    date: dateNow,
    onsite: onsite,
  });
  try {
    await ticket.save();
    res.status(201).json({ message: "Weigh in Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
