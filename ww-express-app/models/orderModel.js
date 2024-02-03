const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateFinish: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amountDelivered: {
    type: Number,
    required: true,
  },
  deliveryAddress1: {
    type: String,
    required: true,
  },
  deliveryAddress2: {
    type: String,
    required: true,
  },
  deliveryTown: {
    type: String,
    required: true,
  },
  deliveryPostCode: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: Number,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
//fixed?
