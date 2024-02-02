const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
const truckModel = require("../../models/truckModel");
const getTime = require("../../functions/getTime");

/**
 * Weigh out finishes the half completed ticket.
 */

router.put("/", async (req, res) => {
  const { reg, outWeight } = req.body;

  console.log("Recieved a weigh out request with reg:", reg);

  try {
    const truck = await truckModel.findOne({ reg: reg });
    if (!truck) {
      //Case where no truck on db
      return res.status(404).json({ message: "Truck not found on database!." });
    }
    if (outWeight > truck.maxGVW) {
      //Bad request, refuse to save any tickets with overweight loads server side.
      return res.status(400).json({
        message:
          "Vehicle overweight, Please instruct driver to return to loading site and drop off some payload",
      });
    }

    const timeNow = getTime();
    const updateResult = await ticketModel.updateOne(
      { reg: reg, onsite: true },
      {
        $set: {
          outWeight: outWeight,
          timeOut: timeNow,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Ticket not found or truck not onsite." });
    }

    res.status(200).json({ message: "Weigh out Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
