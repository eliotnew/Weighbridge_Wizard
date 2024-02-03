const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
const truckModel = require("../../models/truckModel");
const orderModel = require("../../models/orderModel");
const getTime = require("../../functions/getTime");
const mongoose = require("mongoose");

/**
 * Weigh out finishes the half completed ticket.
 * It performs multiple transactions on the database.
 * This function myst first of check the truck is not overweight by querying the truck schema,
 * then It needs to attempt to update the order the amount of product being sent through before updating the ticket.
 */

router.put("/", async (req, res) => {
  const { reg, outWeight } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction(); //Uses a transaction session so that it can roll back if the whole operation fails at any point.

  try {
    await session.withTransaction(async () => {
      //--------------------------------------------------------->> First Check the truck is not exceeding max Gross weight
      const truck = await truckModel
        .findOne({ reg: reg, onSite: true })
        .session(session);
      if (!truck) throw new Error("Truck not found on records!");

      if (outWeight > truck.maxGVW) {
        throw new Error("Vehicle overweight."); //Inform the clerk to instruct driver to tip off and return for a weigh out.
      }
      //--------------------------------------------------------->> Next Update the Ticket
      const netWeight = outWeight - truck.tareWeight;
      const timeNow = getTime();

      const ticketUpdate = await ticketModel.updateOne(
        { reg: reg, onsite: true },
        {
          $set: {
            outWeight: outWeight,
            timeOut: timeNow,
            netWeight: netWeight,
            onsite: false,
          },
        },
        { session }
      );

      if (ticketUpdate.matchedCount === 0) {
        throw new Error("No onsite ticket found for truck.");
      }
      //--------------------------------------------------------->> Find the associated order
      const order = await orderModel
        .findOne({ orderNumber: truck.order_Id, open: true })
        .session(session);
      if (!order) {
        throw new Error("Associated open order not found.");
      }

      //--------------------------------------------------------->> If the quota (order.quantity) is met, closes order and updates
      const newDelivered = order.amountDelivered + netWeight;
      if (newDelivered > order.quantity) {
        await orderModel.updateOne(
          { _id: order._id },
          { $set: { amountDelivered: newDelivered, open: false } },
          { session }
        );
        console.log("An order contract was completed.");
      } else {
        //--------------------------------------------------------->> Update the order's amount delivered.
        await orderModel.updateOne(
          { _id: order._id },
          { $set: { amountDelivered: newDelivered } },
          { session }
        );
      }
    });

    await session.commitTransaction();
    res.status(200).json({ message: "Weigh out successful." });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
