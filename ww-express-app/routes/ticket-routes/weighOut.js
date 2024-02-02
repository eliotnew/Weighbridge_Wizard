const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
const truckModel = require("../../models/truckModel");
const orderModel = require("../../models/orderModel");
const getTime = require("../../functions/getTime");

/**
 * Weigh out finishes the half completed ticket.
 * This function myst first of check the truck is not overweight by querying the truck schema,
 * then It needs to attempt to update the order the amount of product being sent through before updating the ticket.
 */

router.put("/", async (req, res) => {
  const { reg, outWeight } = req.body;
  let netWeight;
  let order_Id;
  let totalDelivered;

  console.log("Recieved a weigh out request with reg:", reg);

  try {
    //---------------Finds truck and then assesses whether it is onsite and isnt overweight
    const truck = await truckModel.findOne({ reg: reg });
    if (!truck) {
      //Case where no truck on db
      return res.status(404).json({ message: "Truck not found on database!." });
    }
    netWeight = truck.outWeight - truck.tareWeight;
    order_Id = truck.order_Id;

    if (outWeight > truck.maxGVW) {
      //Bad request, refuse to save any tickets with overweight loads server side.
      return res.status(400).json({
        message:
          "Vehicle overweight, Please instruct driver to return to loading site and drop off some payload",
      });
    }
    //------------------------updates the ticket
    const timeNow = getTime();
    const updateResult = await ticketModel.updateOne(
      { reg: reg, onsite: true },
      {
        $set: {
          outWeight: outWeight,
          timeOut: timeNow,
          netWeight: netWeight,
          onsite: false,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Ticket not found or truck not onsite." });
    }

    //-----------------------updates the associated order to record that the quantity sent out is recorded

    //get the amount delivered , add the net weight, and update the records of the order
    const order = await orderModel.findOne({
      orderNumber: order_Id,
      open: true,
    });
    totalDelivered = order.amountDelivered;
    const newDelivered = totalDelivered + netWeight;

    await orderModel.updateOne(
      { orderNumber: order_Id, open: true },
      { $set: { amountDelivered: newDelivered } }
    );

    res.status(200).json({ message: "Weigh out Successful," });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
