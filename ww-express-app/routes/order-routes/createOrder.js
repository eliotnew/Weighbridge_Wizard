const express = require("express");
const router = express.Router();
const orderModel = require("../../models/orderModel");
const getDate = require("../../functions/getDate");
const generateOrderNumberID = require("../../functions/generateOrderNumberID");

/**
 * Endpoint to create an order.
 * Order Number and dates will be automatically handled server side.
 */
router.post("/", async (req, res) => {
  const {
    company,
    product,
    quantity,
    deliveryAddress1,
    deliveryAddress2,
    deliveryTown,
    deliveryPostCode,
    contactPhone,
    contactEmail,
  } = req.body;

  //Server side information to set
  const dateStart = getDate();
  const empty = "";
  const orderNumber = generateOrderNumberID();

  console.log("Recieved order creation request: " + company);

  const order = new orderModel({
    orderNumber: orderNumber,
    company: company,
    dateStart: dateStart,
    dateFinish: empty,
    open: true,
    product: product,
    quantity: quantity,
    amountDelivered: 0,
    deliveryAddress1: deliveryAddress1,
    deliveryAddress2: deliveryAddress2,
    deliveryTown: deliveryTown,
    deliveryPostCode: deliveryPostCode,
    contactPhone: contactPhone,
    contactEmail: contactEmail,
  });

  try {
    await order.save();
    res.status(201).json({ message: "Order Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
