const express = require("express");
const router = express.Router();
const truckModel = require("../../models/truckModel");

/**
 * Confirms whether the truck exists on the database or not and returns the truck type
 */

router.get("/:reg", async (req, res) => {
  const reg = req.params.reg; // Corrected this line
  const truck = await truckModel.findOne({ reg: reg });

  if (truck) {
    res.status(200).json({
      exists: true,
      truckType: truck.truckType,
    });
  } else {
    res
      .status(404)
      .json({ message: "The truck does not exist on the db.", exists: false });
  }
});

module.exports = router;
