const express = require("express");
const router = express.Router();
const orderModel = require("../../models/orderModel");

/**
 * Endpoint to close an order.
 * with open false, it iwill no longer be selectable in the IN form.
 */
router.put("/", async (req, res) => {
  const { orderNumber } = req.body;

  const order = await orderModel.findOne({ orderNumber: orderNumber });

  if (order) {
    try {
      await orderModel.updateOne(
        { orderNumber: orderNumber },
        { $set: { open: false } }
      );
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
      return;
    }
  } else {
    return res
      .status(404)
      .json({ message: "The truck does not exist on the db." });
  }
});

module.exports = router;
