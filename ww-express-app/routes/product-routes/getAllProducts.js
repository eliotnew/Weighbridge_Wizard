const express = require("express");
const router = express.Router();
const productModel = require("../../models/productModel");

// returns all products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    } else {
      res.status(200).json(tickets);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
