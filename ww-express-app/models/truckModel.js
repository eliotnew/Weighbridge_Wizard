const mongoose = require("mongoose");
// GVW = Max Gross Vehicle Weight.
const truckSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reg: {
    type: String,
    required: true,
  },
  truckType: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  maxGVW: {
    type: Number,
    required: true,
  },
});

const truckModel = mongoose.model("Truck", truckSchema);

module.exports = truckModel;
