const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const truckModel = require("../../models/truckModel");

/**
 * Creates a truck on the db.
 */

router.post("/", async (req, res) => {
  const { driverName, email, reg, truckType, phone, maxGVW } = req.body;

  console.log("Recieved body : reg:", reg);

  const truckExists = await truckModel.findOne({ reg: reg });

  if (truckExists) {
    return res
      .status(409)
      .json({ message: "Truck with this registration already exists." });
  }

  const truck = new truckModel({
    driverName,
    email,
    reg,
    truckType,
    phone,
    maxGVW,
  });

  try {
    await truck.save();
    res.status(201).json({ message: "Truck Saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
