const express = require("express");
const router = express.Router();
const orderModel = require("../../models/orderModel");

// returns all ongoing orders
router.get("/", async (req, res) => {
  try {
    const openOrders = await orderModel.find({ open: true });
    res.status(200).json(openOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
