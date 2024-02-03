const express = require("express");
const router = express.Router();
const truckModel = require("../../models/truckModel");

/**
 * gets a truck on the db by reg.
 */

router.get("/:reg", async (req, res) => {
  const { reg } = req.params.reg;

  console.log("Recieved a request to GET a truck by reg:", reg);

  const truck = await truckModel.findOne({ reg: reg });

  if (truck) {
    res.status(200).json({
      driverName: truck.driverName,
      email: truck.email,
      reg: truck.reg,
      truckType: truck.truckType,
      phone: truck.phone,
      maxGVW: truck.maxGVW,
    });
    return;
  } else {
    res.status(404).json({ message: "The truck does not exist on the db." });
    return;
  }
});

module.exports = router;
