const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");

// returns all onsite trucks
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketModel.find({ onSite: true });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
