const express = require("express");
const router = express.Router();
const orderModel = require("../../models/orderModel");

// For the weigh in, returns all orders compatible with the truck type
router.get("/", async (req, res) => {
  const compatible = req.query.compatible; // Compatible is referring to the type of truck (exact string)

  if (!compatible) {
    return res
      .status(400)
      .json({ message: "Compatible truck type parameter is required" });
  }

  try {
    const compatibleOrders = await orderModel.find({
      open: true,
      truckRequired: compatible,
    });
    if (compatibleOrders.length === 0) {
      return res
        .status(404)
        .json({
          message: "No orders for this truck type are currently available.",
        });
    }

    res.status(200).json(compatibleOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
