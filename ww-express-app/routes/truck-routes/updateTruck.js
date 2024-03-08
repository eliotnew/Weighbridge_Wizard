const express = require("express");
const router = express.Router();
const truckModel = require("../../models/truckModel");

/**
 * update a truck on the db by reg.
 */

router.put("/", async (req, res) => {
  const { driverName, email, reg, truckType, phone, maxGVW } = req.body;

  console.log("Received a request to PUT a truck by reg:", reg);

  const truck = await truckModel.findOne({ reg: reg });

  if (truck) {
    try {
      await truckModel.updateOne(
        { reg: reg },
        {
          $set: {
            driverName: driverName,
            email: email,
            reg: reg,
            truckType: truckType,
            phone: phone,
            maxGVW: maxGVW,
          },
        }
      );
      res.status(200).json({ message: "Truck updated successfully", reg: reg });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(404).json({ message: "The truck does not exist in the db." });
  }
});

module.exports = router;
