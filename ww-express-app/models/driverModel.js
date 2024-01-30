const mongoose = require("mongoose");
//I will need to confirm what details are needed to keep with the driver
const driverSchema = new mongoose.Schema({
  name: {
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
  wheels: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
});

const driverModel = mongoose.model("Driver", driverSchema);

module.exports = driverModel;
