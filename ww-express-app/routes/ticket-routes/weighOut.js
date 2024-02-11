const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
const truckModel = require("../../models/truckModel");
const orderModel = require("../../models/orderModel");
const getTime = require("../../functions/getTime");
const getDate = require("../../functions/getDate");
const mongoose = require("mongoose");

/**
 * Weigh out finishes the half completed ticket.
 * It was supposed to be done in a transaction but sadly i couldn't get my instance of mongo to work with it.
 * This function myst first of check the truck is not overweight by querying the truck schema,
 * then It needs to attempt to update the order the amount of product being sent through before updating the ticket.
 */

router.put("/", async (req, res) => {
  const { reg, outWeight } = req.body;

  const session = await mongoose.startSession();
  //session.startTransaction(); //Uses a transaction session so that it can roll back if the whole operation fails at any point.

  try {
    await session.withTransaction(async () => {
      //--------------------------------------------------------->> First Check the truck is not exceeding max Gross weight (The Client side also handles this.)
      const truck = await truckModel.findOne({ reg: reg }).session(session);
      if (!truck)
        throw new Error(
          "Truck's reg was not found so it's overweightness couldnt be calculated!"
        );

      if (outWeight > truck.maxGVW) {
        throw new Error("Vehicle overweight."); //Inform the clerk to instruct driver to tip off and return for a weigh out.
      }
      console.log(
        "Fetched Truck and determined that the out weight was not greateer than the max GVW."
      );
      //--------------------------------------------------------->> Next Update the Ticket
      const onSiteTicket = await ticketModel.findOne({
        reg: reg,
        onSite: true,
      });

      if (!onSiteTicket) {
        throw new Error("No onsite ticket found for truck.");
      }
      console.log(
        "Found the ticket that says that the truck got by reg is onsite."
      );
      console.log("Before netweight, outweight is : " + outWeight);
      const netWeight = outWeight - onSiteTicket.tareWeight;
      console.log("Net weight it " + netWeight);
      const orderNumberFromTicket = onSiteTicket.order_Id;
      console.log("ordernumber from the ticket is " + orderNumberFromTicket);
      const timeNow = getTime();

      const ticketUpdate = await ticketModel.updateOne(
        { reg: reg, onSite: true },
        {
          $set: {
            outWeight: outWeight,
            timeOut: timeNow,
            netWeight: netWeight,
            onSite: false,
          },
        },
        { session }
      );

      if (ticketUpdate.matchedCount === 0) {
        throw new Error("Didnt update Ticket with weights and to be offsite.");
      }
      //--------------------------------------------------------->> Find the associated order
      const order = await orderModel
        .findOne({
          orderNumber: orderNumberFromTicket,
          open: true,
        })
        .session(session);
      if (!order) {
        throw new Error(
          "The Associated open order not found. Searched for an open ordermodel with orderNumber: " +
            orderNumberFromTicket
        );
      }
      console.log("The order found assosciated by id is " + order);

      //--------------------------------------------------------->> If the quota (order.quantity) is met, closes order and updates
      const newDelivered = order.amountDelivered + netWeight;
      const date = getDate();
      console.log(
        "The old delivered material quantity was: " +
          order.amountDelivered +
          " And with this loading is now: " +
          newDelivered +
          " This will be updated in the order model."
      );
      if (newDelivered >= order.quantity) {
        await orderModel.updateOne(
          { orderNumber: orderNumberFromTicket },
          {
            $set: {
              amountDelivered: newDelivered,
              open: false,
              dateFinish: date,
            },
          },
          { session }
        );
      } else {
        //--------------------------------------------------------->> Update the order's amount delivered.
        await orderModel.updateOne(
          { orderNumber: orderNumberFromTicket },
          { $set: { amountDelivered: newDelivered } },
          { session }
        );
      }
      await session.commitTransaction();
      res.status(200).json({ message: "Success" });
      console.log("Weigh out sucessful!");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
});
module.exports = router;
