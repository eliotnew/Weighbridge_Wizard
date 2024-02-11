const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");

// returns all onsite trucks
router.get("/:reg", async (req, res) => {
  const reg = req.params.reg;
  try {
    const ticket = await ticketModel.findOne({ onSite: true, reg: reg });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
