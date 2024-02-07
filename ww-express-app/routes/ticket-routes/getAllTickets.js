const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");

// returns all onsite trucks
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketModel.find();

    if (tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    } else {
      res.status(200).json(tickets);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
