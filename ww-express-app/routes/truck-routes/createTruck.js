const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const truckModel = require("../../models/truckModel");

/**
 * Creates a truck on the db. Hashes personal data for cyber security.
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

  const saltRounds = 8;
  const hashedPhone = await bcrypt.hash(phone, saltRounds);
  const hashedEmail = await bcrypt.hash(email, saltRounds);
  const hashedName = await bcrypt.hash(driverName, saltRounds);

  const truck = new truckModel({
    hashedName,
    hashedEmail,
    reg,
    truckType,
    hashedPhone,
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
