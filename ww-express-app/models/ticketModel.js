const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  reg: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  tareWeight: {
    type: Number,
    required: true,
  },
  outWeight: {
    type: Number,
    required: false,
  },
  netWeight: {
    type: Number,
    required: false,
  },
  clerk_Id: {
    type: String,
    required: true,
  },
  loadedLocation: {
    type: String,
    required: true,
  },
  order_Id: {
    type: String,
    required: true,
  },
  timeIn: {
    type: String,
    required: true,
  },
  timeOut: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  onSite: {
    type: Boolean,
    required: true,
  },
});

const ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;
